# Locus App — Refactoring Notes

## Overview

This document tracks structural changes, bug fixes, and architectural improvements made to the Locus Electron application.

---

## v1.x — 2025 (Date Unknown)

### 1. Fixed SQLite Foreign Key Constraint Error

**Problem:** `initDatabase()` in `src/main/database/db.ts` was wrapping `db.exec()` calls inside `db.transaction()`, which causes immediate execution outside the transaction boundary. Combined with missing table cleanup for `weather_aqi` and `province_planner_hints`, this triggered FK constraint violations.

**Files:** `src/main/database/db.ts`

**Fix:**
- Removed `db.transaction()` wrapper (unnecessary for cleanup)
- Added missing `weather_aqi` and `province_planner_hints` to cleanup sequence
- Tables now deleted in correct child→parent order
- `PRAGMA foreign_keys = OFF` set before cleanup, `ON` after

```typescript
// BEFORE (broken — db.exec() bypasses transaction)
db.transaction(() => {
  db.exec("PRAGMA foreign_keys = OFF");
  db.exec(`DELETE FROM ...provinces...`); // runs immediately, not in tx
});

// AFTER (correct — all ops in order with FK disabled)
db.exec("PRAGMA foreign_keys = OFF");
db.exec(`DELETE FROM weather_aqi WHERE province_id IN ${legacyIds}`);
db.exec(`DELETE FROM province_planner_hints WHERE province_id IN ${legacyIds}`);
// ... all dependent tables first ...
db.exec(`DELETE FROM provinces WHERE id IN ${legacyIds}`);
db.exec("PRAGMA foreign_keys = ON");
```

---

### 2. AQI Auto-Sync Architecture

**Problem:** Two separate auto-sync mechanisms existed (RegionDashboard at startup + AQIModal on open), both disabled, and timestamp keys were inconsistent across components. This caused data to show as default (50 AQI) until the user manually triggered a sync.

**Files:** `src/renderer/src/components/AQIModal.tsx`, `src/renderer/src/components/RegionDashboard.tsx`

**Fix:**
- **Removed duplicate auto-sync** from AQIModal — startup sync is now handled exclusively by RegionDashboard
- **Startup sync** runs once per app session, 5 seconds after RegionDashboard mounts
- **Stale threshold:** 24 hours — auto-sync only if last sync > 24h ago
- **Timestamp keys** now use consistent shared utility (see section 4)

```
App Start → RegionDashboard mounts (5s delay)
    └─ hasBootAutoSyncChecked.current = true
    └─ runStartupAqiAutoSync()
            ├─ Check: isDataStale()?
            │       └─ Skip if < 24h
            ├─ Fetch all provinces (AQICN or OpenWeather)
            ├─ Convert PM2.5 → AQI
            ├─ Persist to SQLite via api.db.saveWeatherAqi()
            ├─ saveSyncTimestamp()
            └─ Dispatch 'locus:weather-aqi-updated'
```

---

### 3. Polling Interval Optimization

**Problem:** `weatherRows` in RegionDashboard was polling every 10 seconds — too aggressive and could conflict with manual sync operations.

**Fix:**
- Poll interval reduced from **10 seconds → 60 seconds**
- OpenWeather API delay increased from 250ms → 400ms per request to respect free tier rate limits (60 req/min)

---

### 4. Shared AQI Utility

**Problem:** PM2.5 → AQI conversion formula was duplicated in 3 places (AQIModal, RegionDashboard, and inline in sync logic). AQI level categorization was also duplicated. Timestamp save/read was inconsistent between components.

**File Created:** `src/renderer/src/utils/aqi.ts`

**Exports:**

```typescript
pm25ToAqi(pm25: number): number
  // Uses US EPA breakpoints
  // Default to 50 (Moderate) if input invalid

getAqiLevel(aqi: number): { label, color, bg, value }
  // 6 levels: Good → Hazardous

getAqiLevelSub(aqi: number): string
  // Label string only

saveSyncTimestamp(regionName?: string): void
  // Writes BOTH global + region-specific localStorage keys
  // Keys: locus_aqi_last_sync, locus_aqi_last_sync_timestamp
  //       locus_aqi_last_sync_{region}, locus_aqi_last_sync_timestamp_{region}

getLastSyncLabel(regionName?: string): string
  // Prefers region key if present, falls back to global
  // Returns 'Never' if neither exists

isDataStale(regionName?: string): boolean
  // Returns true if no sync timestamp or > 24h since last sync

AQI_SYNC_EVENT = 'locus:weather-aqi-updated' as const
  // Single source of truth for the sync event name
```

**Used by:**
- `AQIModal.tsx` — manual sync, last sync display
- `RegionDashboard.tsx` — startup sync, PM25 stats, timestamp
- `WeatherHistoryModal.tsx` — event listener
- `ProvinceTacticalPage` — event listener
- `TravelGuidePage` — event listener

---

### 5. Event Name Consolidation

**Problem:** 5 components each defined `WEATHER_AQI_UPDATED_EVENT` locally as a string literal. If the event name ever changed, all 5 files would need updates.

**Fix:** Replaced all local definitions with `AQI_SYNC_EVENT` imported from `src/renderer/src/utils/aqi.ts`

---

## Architecture Diagram

```
User opens app
  └─ RegionDashboard mounts
      ├─ 5s delay
      │   └─ runStartupAqiAutoSync() [once]
      │       ├─ isDataStale()? → skip if fresh
      │       ├─ Fetch AQICN/OpenWeather (400ms/province)
      │       ├─ pm25ToAqi() from aqi.ts
      │       ├─ saveSyncTimestamp() → localStorage
      │       ├─ api.db.saveWeatherAqi() → SQLite
      │       └─ dispatch AQI_SYNC_EVENT
      ├─ Poll weatherRows every 60s
      └─ Listen to AQI_SYNC_EVENT → refresh display

User opens AQIModal
  ├─ Shows last sync timestamp (getLastSyncLabel)
  ├─ Manual "Sync Data" button
  │   ├─ Uses pm25ToAqi() from aqi.ts
  │   ├─ saveSyncTimestamp() → consistent keys
  │   └─ dispatch AQI_SYNC_EVENT
  └─ No duplicate auto-sync
```

---

## Key Constants

| Constant | Value | Location |
|---|---|---|
| `AQI_SYNC_EVENT` | `'locus:weather-aqi-updated'` | `src/utils/aqi.ts` |
| `AQI_SYNC_COOLDOWN_MS` | `86400000` (24h) | `src/utils/aqi.ts` |
| `AQI_SYNC_TIMESTAMP_KEY` | `locus_aqi_last_sync_timestamp` | `src/utils/aqi.ts` |
| `AQI_SYNC_LABEL_KEY` | `locus_aqi_last_sync` | `src/utils/aqi.ts` |

---

## File Changes Summary

| File | Change |
|---|---|
| `src/main/database/db.ts` | FK cleanup order corrected |
| `src/renderer/src/utils/aqi.ts` | **NEW** — Shared AQI utilities |
| `src/renderer/src/components/AQIModal.tsx` | Use shared utilities, remove duplicate auto-sync |
| `src/renderer/src/components/RegionDashboard.tsx` | Use shared utilities, refactored startup sync |
| `src/renderer/src/components/WeatherHistoryModal.tsx` | Use `AQI_SYNC_EVENT` from shared utility |
| `src/renderer/src/pages/ProvinceTactical/index.tsx` | Use `AQI_SYNC_EVENT` from shared utility |
| `src/renderer/src/pages/TravelGuide/index.tsx` | Use `AQI_SYNC_EVENT` from shared utility |

---

*Generated after refactoring sessions. TypeScript compilation: ✓ No errors.*

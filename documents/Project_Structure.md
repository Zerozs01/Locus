# Project Structure

```
locus/
├── .storybook/               # Storybook Configuration
│   ├── main.ts
│   └── preview.ts
├── documents/                # Project Documentation
│   ├── Main_architecture.md  # System Architecture
│   ├── Project_Structure.md  # This file
│   └── Readme.md             # Project Overview
├── resources/                # Static Resources
├── scripts/
│   └── start_all.bat         # Master Launcher (n8n + Ngrok)
├── src/
│   ├── main/                 # Electron Main Process
│   │   ├── index.ts          # Main entry point + IPC bridge for db/n8n
│   │   └── database/         # Local Database Logic
│   │       ├── db.ts         # SQLite Schema & Queries (WAL mode)
│   │       └── initialData.ts # Seeding Data (77 provinces with population/area)
│   ├── preload/              # Electron Preload Scripts
│   │   ├── index.ts          # IPC Bridge (db + n8n)
│   │   └── index.d.ts        # Type Definitions
│   ├── renderer/             # React Frontend (Vite)
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx      # React Entry Point
│   │       ├── components/
│   │       │   ├── CachedImage.tsx      # Safe cached image wrapper
│   │       │   ├── ChatOverlay.tsx      # AI Chat Overlay (shares state with Intelligence page)
│   │       │   ├── DataCard.tsx         # Data Display Cards
│   │       │   ├── DetailCard.tsx       # Region Detail Cards
│   │       │   ├── Footer.tsx           # Footer Component
│   │       │   ├── Header.tsx           # Header Component
│   │       │   ├── MarkdownLite.tsx     # Lightweight markdown renderer for chat output
│   │       │   ├── RegionalIntelBar.tsx # Regional Intelligence Overview Bar
│   │       │   ├── RegionDashboard.tsx  # Region/Province Dashboard
│   │       │   ├── Sidebar.tsx          # Navigation Sidebar
│   │       │   ├── ProvinceMap.tsx      # Leaflet Province Map
│   │       │   ├── ThailandMap.tsx      # Interactive Map (react-simple-maps)
│   │       │   └── *.stories.tsx        # Storybook Stories
│   │       ├── pages/                   # Page Components (React Router)
│   │       │   ├── index.ts             # Page Exports
│   │       │   ├── ThreatRadarPage.tsx  # Main Map View & Dashboard (/)
│   │       │   ├── GeoArchivePage.tsx   # Province Region Gallery (/archive)
│   │       │   ├── TravelGuidePage.tsx  # Transportation & Tourism Hub (/travel-guide/:regionId)
│   │       │   ├── IntelligencePage.tsx # AI Travel Assistant (/intelligence)
│   │       │   ├── ProvinceTactical/    # Province Overview & Features (/province/:regionId/:provinceId)
│   │       │   ├── AnalyticsPage.tsx    # Analytics Dashboard (/analytics)
│   │       │   ├── SettingsPage.tsx     # Settings (/settings)
│   │       │   └── *.stories.tsx        # Page Storybook Stories
│   │       ├── views/
│   │       │   └── ArchiveView.tsx      # Archive View Component
│   │       ├── data/
│   │       │   ├── regionTheme.ts       # Renderer re-export of shared region theme
│   │       │   ├── regions.ts           # Region/Province Types & Static Data
│   │       │   └── thaiProvinceNames.ts # Thai-English Province Name Mapping
│   │       ├── services/
│   │       │   ├── intelligenceChatStore.ts # Persistent multi-chat state
│   │       │   └── n8nClient.ts         # n8n API Client + session handling
│   │       ├── utils/
│   │       │   ├── imageCache.ts        # Cached image URL helper (locus protocol)
│   │       │   └── perf.ts              # Perf measurement helper
│   │       └── styles/
│   │           └── index.css            # Global Styles (TailwindCSS)
│   ├── shared/               # Shared Types & Interfaces
│   │   ├── regionTheme.ts     # Region color/gradient single source of truth
│   │   └── types.ts
│   └── stories/              # Storybook Default Stories
├── electron.vite.config.ts   # Electron-Vite Configuration
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── tsconfig.web.json
```

## Database Schema (SQLite)

### Tables:
- **regions**: id, name, engName, code, desc, color, gradient, image, safety, population, population_value, area, area_value, province_count
- **region_stats**: region_id, dailyCost, dailyCost_value, monthlyCost, monthlyCost_value, food, flora, attraction, nightlife
- **provinces**: id, region_id, name, image, dist, tam, serenity, entertainment, relax, population, population_value, area, area_value, dailyCost, dailyCost_value, safety

---

## Phase 2 Complete ✅

### Completed Features:
- ✅ Interactive Thailand Map with GeoJSON (react-simple-maps)
- ✅ Region selection with zoom animation
- ✅ Province view mode with individual province cards
- ✅ Region-specific hover colors (rose/pink/cyan/purple/green/orange)
- ✅ SQLite database with WAL mode optimization
- ✅ Province data: population, area, dailyCost, safety for all 77 provinces
- ✅ Search provinces with regex support
- ✅ Ultra-minimal scrollbar styling (3px/2px)
- ✅ Province cards show: districts, sub-districts, daily cost, safety rating

### Known Issues (Deferred):
- ⚠️ Stats box doesn't update when selecting individual province (Vite HMR caching issue)

---

## Phase 3: Feature Expansion ✅

### Completed Features:

#### 🗺️ Radar Page (Main Map)
- ✅ Search bar with Thai/English province support
- ✅ Keyboard navigation (Arrow Up/Down, Enter, Escape)
- ✅ Yellow text highlight on focus (no yellow border)
- ✅ Auto-suggest dropdown (max 6 results)

#### 🧭 Explore Hub (formerly Geo-Archive Page, Main Landing `/`)
- ✅ Intent-driven decision flow (Known Destination, Guided Discovery, Interest-based)
- ✅ 5-step interactive questionnaire for Guided Discovery with theme-based colors
- ✅ Editable summary page with direct AI handoff feature
- ✅ Seamless navigation to Map and Intelligence features with pre-filled context

#### 🗺️ Province Tactical View (`/province/:regionId/:provinceId`)
- ✅ Dynamic GeoJSON centroid coordinate calculation for accurate map centering
- ✅ Responsive Tab navigation (condensed single-row layout for Explore, Stay, Eat, Transit, Critical)
- ✅ Integrated Current Season indicator based on current month
- ✅ Unified Province Overview card with quick stats, weather, and current season
- ✅ Condensed Planning Priorities (Activities) layout

#### 🚌 Travel Guide Page
- ✅ Transport routes by region (bus, van, train, plane, boat)
- ✅ Fare calculator with text input + dropdown modes
- ✅ Filter by transport type
- ✅ Route details with via provinces

#### 🤖 Intelligence Page (AI Chat)
- ✅ Auto-expanding, bottom-anchored chat input area (similar to ChatGPT/Gemini)
- ✅ Context-aware chat initialized from Explore Hub or map navigation
- ✅ "Chat with AI" button with region-specific colors
- ✅ Image upload support (drag & drop)
- ✅ Markdown text rendering

#### 🎨 UI/UX Improvements
- ✅ Refactored Sidebar hierarchy: Explore Hub is now the homepage (`/`), Thai Map is `/map`
- ✅ Region-specific Chat button colors
- ✅ Thai province name mapping (thaiProvinceNames.ts)
- ✅ Keyboard navigation in all search bars
- ✅ Search bar glow effect on auto-focus when routing from Explore Hub

---

## Current Intelligence/N8N Status 🚀

### Completed:
- ✅ Electron main/preload bridge for `n8n:health` and `n8n:chat`
- ✅ `SettingsPage` test flow checks both health and chat webhook
- ✅ persistent `sessionId` sent to n8n for memory-aware chat workflows
- ✅ local recent-chat persistence in `intelligenceChatStore.ts`
- ✅ background reply completion while navigating between app pages
- ✅ markdown-like chat rendering in app (`MarkdownLite.tsx`)

### Still Open:
- [ ] unread/pending badge outside Intelligence page
- [ ] analytics readiness should distinguish health-only vs full workflow readiness
- [ ] province/route data model should incorporate deeper LightRAG travel-ready fields

---

## Phase C: Performance Pass ✅

### Completed:
- ✅ Geo-Archive server-side pagination + indexed filtering (`db:getArchiveProvinces`)
- ✅ TravelGuide search matcher precompiled for faster filtering + suggestions
- ✅ Analytics loads region summaries in parallel (reduced blocking)
- ✅ Asset cache: `locus://image` protocol + disk cache controls in Settings
- ✅ Image cache supports range requests for large assets

---

## Phase D: Asset Reliability ✅

### Completed:
- ✅ Image protocol registers before window creation to prevent 404 race conditions
- ✅ Fallback image for invalid/failed URLs + short-lived failure cache

---

## Region Color Scheme

| Region | Thai Name | Color Class | Gradient |
|--------|-----------|-------------|----------|
| North | ภาคเหนือ | `text-rose-400` | `from-rose-600/20` |
| Northeast | ภาคอีสาน | `text-pink-400` | `from-pink-600/20` |
| Central | ภาคกลาง | `text-cyan-400` | `from-cyan-600/20` |
| South | ภาคใต้ | `text-orange-400` | `from-orange-600/20` |
| West | ภาคตะวันตก | `text-purple-400` | `from-purple-600/20` |
| East | ภาคตะวันออก | `text-green-400` | `from-green-600/20` |

> Source of truth: `src/shared/regionTheme.ts` (renderer uses `src/renderer/src/data/regionTheme.ts` re-export)

---

## Storybook Stories

### Components
- `RegionDashboard.stories.tsx` - Region/Province dashboard with all modes

### Pages
- `RadarPage.stories.tsx` - Main map view
- `GeoArchivePage.stories.tsx` - Province gallery
- `TravelGuidePage.stories.tsx` - Transport routes (per region)
- `IntelligencePage.stories.tsx` - AI chat (with/without context)

---

## Note on Recent Chats

- Current app behavior now supports multiple conversation threads
- Chats are stored locally and remain until the user deletes them
- The user can create a new chat, switch to an old chat, delete a single chat, or delete the active chat from the header

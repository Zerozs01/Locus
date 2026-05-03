# Project Structure

```
locus/
├── .storybook/               # Storybook Configuration
│   ├── main.ts
│   └── preview.ts
├── documents/                # Project Documentation
│   ├── Main_architecture.md  # System Architecture
│   ├── Project_Structure.md  # This file
│   ├── Readme.md             # Project Overview
│   └── Essential_Data_Acquisition_V1.md  # Data Acquisition Logs
├── resources/                # Static Resources
├── scripts/
│   ├── start_all.bat         # Master Launcher (n8n + Ngrok)
│   └── archive/              # Legacy refactor scripts
├── src/
│   ├── main/                 # Electron Main Process
│   │   ├── index.ts          # Main entry point + IPC bridge for db/n8n/map
│   │   ├── config/
│   │   │   └── runtimeConfig.ts  # Runtime config persistence (ngrok, api keys)
│   │   └── database/         # Local Database Logic
│   │       ├── db.ts         # SQLite Schema & Queries (WAL mode)
│   │       ├── initialData.ts # Seeding Data (77 provinces with population/area)
│   │       ├── portalSeed_*.ts # Portal/Essential Data seeding (region batches)
│   │       └── portalSeed_*.ts (Isan, EastWest, South, Central, North)
│   ├── preload/              # Electron Preload Scripts
│   │   ├── index.ts          # IPC Bridge (db + n8n + map + assets + config)
│   │   └── index.d.ts        # Type Definitions
│   ├── renderer/             # React Frontend (Vite)
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx      # React Entry Point
│   │       ├── components/
│   │       │   ├── AQIModal.tsx           # AQI data modal
│   │       │   ├── CachedImage.tsx        # Safe cached image wrapper
│   │       │   ├── ChatOverlay.tsx        # AI Chat Overlay (shares state with Intelligence page)
│   │       │   ├── DataCard.tsx           # Data Display Cards
│   │       │   ├── DetailCard.tsx         # Region Detail Cards
│   │       │   ├── Footer.tsx              # Footer Component
│   │       │   ├── GradientProgressBar.tsx # Gradient progress bar
│   │       │   ├── Header.tsx              # Header Component
│   │       │   ├── MarkdownLite.tsx       # Lightweight markdown renderer for chat output
│   │       │   ├── ProvinceMap.tsx        # Leaflet Province Map (themes + data layers)
│   │       │   ├── RegionalIntelBar.tsx   # Regional Intelligence Overview Bar
│   │       │   ├── RegionDashboard.tsx    # Region/Province Dashboard
│   │       │   ├── ResourceInventory.tsx  # Resource inventory component
│   │       │   ├── Sidebar.tsx            # Navigation Sidebar
│   │       │   ├── ThailandMap.tsx        # Interactive Map (react-simple-maps)
│   │       │   ├── ThreatConfig.tsx       # Threat configuration
│   │       │   ├── WeatherHistoryModal.tsx # Weather history modal
│   │       │   └── *.stories.tsx          # Storybook Stories
│   │       ├── pages/                   # Page Components (React Router)
│   │       │   ├── index.ts              # Page Exports
│   │       │   ├── ThreatRadarPage.tsx   # Main Map View & Dashboard (/map)
│   │       │   ├── GeoArchivePage.tsx    # Explore Hub - intent-first landing (/)
│   │       │   ├── TravelGuide/          # Travel Guide Hub (/travel-guide/:regionId)
│   │       │   │   ├── index.tsx         # Transport routes, portal data, route planner
│   │       │   │   ├── data/
│   │       │   │   │   ├── calendarHelpers.ts    # Season/travel condition helpers
│   │       │   │   │   ├── ecoDb.ts             # Ecology (fauna/flora/terrain/climate) entities
│   │       │   │   │   ├── portalData.ts        # Portal data (transport, supply, knowledge)
│   │       │   │   │   ├── regionBriefs.ts      # Region brief summaries
│   │       │   │   │   ├── regionExpenses.ts    # Region expense data
│   │       │   │   │   └── transportRoutes.ts   # Transport route definitions
│   │       │   ├── ProvinceTactical/     # Province Overview & Features (/province/:regionId/:provinceId)
│   │       │   │   ├── index.tsx         # Province detail page with map + tabs
│   │       │   │   ├── data.tsx           # Province data generator
│   │       │   │   ├── types.ts           # Province page types
│   │       │   │   ├── components/
│   │       │   │   │   └── HelperComponents.tsx
│   │       │   │   └── tabs/
│   │       │   │       ├── ExploreTab.tsx      # Province overview
│   │       │   │       ├── StayTab.tsx          # Accommodation info
│   │       │   │       ├── EatTab.tsx           # Food & supply info
│   │       │   │       ├── TravelTab.tsx        # Transit info
│   │       │   │       └── EssentialsTab.tsx   # Emergency/essential contacts
│   │       │   ├── IntelligencePage.tsx  # AI Travel Assistant (/intelligence)
│   │       │   ├── AnalyticsPage.tsx      # Analytics Dashboard (/analytics)
│   │       │   ├── SettingsPage.tsx       # Settings (/settings)
│   │       │   └── *.stories.tsx         # Page Storybook Stories
│   │       ├── views/
│   │       │   └── ArchiveView.tsx       # Archive View Component
│   │       ├── data/
│   │       │   ├── regionTheme.ts        # Renderer re-export of shared region theme
│   │       │   ├── regions.ts            # Region/Province Types & Static Data
│   │       │   ├── thaiProvinceNames.ts  # Thai-English Province Name Mapping
│   │       │   ├── coordinates.ts        # Province coordinates
│   │       │   ├── thailand-geo.json     # Thailand GeoJSON
│   │       │   └── thailand-outline.json # Thailand outline GeoJSON
│   │       ├── services/
│   │       │   ├── intelligenceChatStore.ts  # Persistent multi-chat state
│   │       │   ├── chatThemeStore.ts          # Chat theme state (Zustand)
│   │       │   └── n8nClient.ts               # n8n API Client + session handling
│   │       ├── utils/
│   │       │   ├── aqi.ts              # AQI utilities + sync event
│   │       │   ├── color.ts            # Color utilities (toRgba)
│   │       │   ├── csvDb.ts            # CSV-based DB fallback
│   │       │   ├── imageCache.ts       # Cached image URL helper (locus protocol)
│   │       │   └── perf.ts             # Perf measurement helper (measureAsync)
│   │       ├── theme/
│   │       │   ├── chatTheme.ts        # Chat theme definitions
│   │       │   └── useChatTheme.ts     # Chat theme hook
│   │       ├── layouts/
│   │       │   └── RootLayout.tsx      # Root layout with sidebar
│   │       ├── router/
│   │       │   └── index.tsx           # React Router routes (HashRouter)
│   │       ├── styles/
│   │       │   └── index.css          # Global Styles (TailwindCSS)
│   │       └── types/
│   │           └── react-simple-maps.d.ts # Type definitions
│   ├── shared/               # Shared Types & Interfaces
│   │   ├── regionTheme.ts    # Region color/gradient single source of truth
│   │   └── types.ts          # Core TypeScript interfaces
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
- **province_portal**: province_id, transport (JSON), supply (JSON), knowledge (JSON), tips (JSON), environment (JSON), emergencyNumbers (JSON), localFoods/localFood (JSON), dangerZones (JSON), bestSeason, transportRoutes (JSON), ecoIds (JSON), newEcoEntities (JSON), plannerHints (JSON)
- **weather_aqi**: provinceId, date, temperature, aqi (auto-synced from external APIs)

### IPC Channels (Preload → Renderer exposed as `window.api.*`):
- **db**: getRegions, getRegionSummaries, getRegion, getProvince, getProvincePortal, getProvincesByRegion, getProvinceIndex, getArchiveProvinces, getStats, forceReseed, saveWeatherAqi, getWeatherAqi
- **n8n**: health, chat
- **map**: getRainRadarTileTemplate, searchEvChargers, fetchGistdaFeatures
- **assets**: getImageCacheStats, clearImageCache
- **config**: get, set

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
- ✅ Rain radar tile overlay (RainViewer API + OpenWeather fallback)
- ✅ EV charger search (OpenChargeMap API)
- ✅ GISTDA feature fetching with no-proxy session

#### 🧭 Explore Hub (formerly Geo-Archive Page, Main Landing `/`)
- ✅ Intent-driven decision flow (Known Destination, Guided Discovery, Interest-based)
- ✅ 5-step interactive questionnaire for Guided Discovery with theme-based colors
- ✅ Editable summary page with direct AI handoff feature
- ✅ **Multi-Region Filter (Explore Mode):** Toggleable selection of multiple regions simultaneously with visual feedback (checkmarks/glow) and dynamic result aggregation.
- ✅ Seamless navigation to Map and Intelligence features with pre-filled context

#### 🗺️ Province Tactical View (`/province/:regionId/:provinceId`)
- ✅ Dynamic GeoJSON centroid coordinate calculation for accurate map centering
- ✅ Interactive Leaflet map with multiple themes (voyager/positron/dark/osm/satellite/terrain/admin)
- ✅ Data layer toggles: traffic, gistdaAqi, aqicnAqi, rainRadar, floodRecurrent, evCharger, slope
- ✅ Responsive Tab navigation (condensed single-row layout for Overview, Stay, Eat, Transit, Critical)
- ✅ Integrated Current Season indicator based on current month
- ✅ Unified Province Overview card with quick stats, weather, and current season
- ✅ Condensed Planning Priorities (Activities) layout
- ✅ Live weather/AQI sync from SQLite (10s polling + event-based)
- ✅ Focus navigation from Travel Guide (focusPlace, focusRoute state passing)

#### 🚌 Travel Guide Page (`/travel-guide/:regionId`)
- ✅ Transport routes by region (bus, van, train, plane, boat, songthaew, tuk_tuk, bike, other)
- ✅ Fare calculator with text input + dropdown modes
- ✅ Filter by transport type with dynamic contrast colors per region
- ✅ Route details with via provinces
- ✅ Transport company cards with logo text, description, and warp links
- ✅ Route planner with origin/destination inputs, date picker, and current location support
- ✅ Route recommendations sorted by speed/price with traffic penalty modeling
- ✅ Season/travel condition display (traffic risk, rain status)
- ✅ Portal data integration (transport, supply, knowledge, ecology, emergency)
- ✅ Ecology entity browser (fauna, flora, terrain, climate) with dynamic province data
- ✅ Knowledge/Tips section from portal data
- ✅ Supply/Facilities section (bank, gas, other)
- ✅ Danger zones with hotspot visualization
- ✅ Province news panel with API sync + mock fallback
- ✅ Live AQI/Temperature sync from SQLite
- ✅ Weather history modal

#### 🤖 Intelligence Page (AI Chat)
- ✅ Auto-expanding, bottom-anchored chat input area (similar to ChatGPT/Gemini)
- ✅ Context-aware chat initialized from Explore Hub or map navigation
- ✅ "Chat with AI" button with region-specific colors
- ✅ Image upload support (drag & drop)
- ✅ Markdown text rendering
- ✅ Multi-conversation chat history with local persistence
- ✅ Session ID tracking for memory-aware n8n workflows
- ✅ Background reply completion while navigating pages

#### 🎨 UI/UX Improvements
- ✅ Refactored Sidebar hierarchy: Explore Hub is now the homepage (`/`), Thai Map is `/map`
- ✅ Region-specific Chat button colors
- ✅ Thai province name mapping (thaiProvinceNames.ts)
- ✅ Keyboard navigation in all search bars
- ✅ Search bar glow effect on auto-focus when routing from Explore Hub
- ✅ Chat theme system with Zustand store
- ✅ Color utilities (toRgba)

---

## Current Intelligence/N8N Status 🚀

### Completed:
- ✅ Electron main/preload bridge for `n8n:health` and `n8n:chat`
- ✅ `SettingsPage` test flow checks both health and chat webhook
- ✅ Persistent `sessionId` sent to n8n for memory-aware chat workflows
- ✅ Local recent-chat persistence in `intelligenceChatStore.ts`
- ✅ Background reply completion while navigating between app pages
- ✅ Markdown-like chat rendering in app (`MarkdownLite.tsx`)
- ✅ n8n config override support (webhookUrl, apiKey per-request)
- ✅ Adaptive endpoint detection (handles ngrok webhook variations)

### Still Open:
- [ ] unread/pending badge outside Intelligence page
- [ ] analytics readiness should distinguish health-only vs full workflow readiness

---

## Phase C: Performance Pass ✅

### Completed:
- ✅ Geo-Archive server-side pagination + indexed filtering (`db:getArchiveProvinces`)
- ✅ TravelGuide search matcher precompiled for faster filtering + suggestions
- ✅ Analytics loads region summaries in parallel (reduced blocking)
- ✅ Asset cache: `locus://image` protocol + disk cache controls in Settings
- ✅ Image cache supports range requests for large assets
- ✅ Performance measurement utility (`measureAsync` in perf.ts)
- ✅ Nominatim search with thai/english accept-language

---

## Phase D: Asset Reliability ✅

### Completed:
- ✅ Image protocol registers before window creation to prevent 404 race conditions
- ✅ Fallback SVG image for invalid/failed URLs + short-lived failure cache (10min TTL)
- ✅ Range request support for large cached images
- ✅ Disk cache size limit (512MB) with automatic sweep
- ✅ Image cache stats + clear from Settings

---

## Phase E: Map & Weather Integration ✅

### Completed:
- ✅ Rain radar tile template from RainViewer API with OpenWeather fallback
- ✅ Weather/AQI SQLite persistence (`saveWeatherAqi`, `getWeatherAqi`)
- ✅ Live weather sync in ProvinceTactical and TravelGuide (10s polling + sync event)
- ✅ EV charger search via OpenChargeMap API
- ✅ GISTDA feature fetching with dedicated no-proxy session
- ✅ AQI sync event (`AQI_SYNC_EVENT`) for cross-component coordination

---

## Region Color Scheme

| Region | Thai Name | Color Class | Gradient |
|--------|-----------|-------------|----------|
| North | ภาคเหนือ | `text-violet-400` | `from-violet-600/18 to-pink-900/12` |
| Northeast | ภาคอีสาน | `text-red-400` | `from-red-700/18 to-orange-900/12` |
| Central | ภาคกลาง | `text-orange-400` | `from-orange-700/18 to-yellow-700/12` |
| West | ภาคตะวันตก | `text-emerald-400` | `from-emerald-800/18 to-lime-700/12` |
| East | ภาคตะวันออก | `text-yellow-400` | `from-amber-700/18 to-yellow-700/12` |
| South | ภาคใต้ | `text-blue-400` | `from-blue-700/18 to-sky-800/12` |

> Source of truth: `src/shared/regionTheme.ts` (renderer uses `src/renderer/src/data/regionTheme.ts` re-export)

---

## Storybook Stories

### Components
- `RegionDashboard.stories.tsx` - Region/Province dashboard with all modes
- `ChatOverlay.stories.tsx` - Chat overlay component
- `DataCard.stories.tsx` - Data display cards
- `DetailCard.stories.tsx` - Detail cards
- `Footer.stories.tsx` - Footer component
- `Header.stories.tsx` - Header component
- `Sidebar.stories.tsx` - Navigation sidebar
- `ThailandMap.stories.tsx` - Thailand interactive map

### Pages
- `RadarPage.stories.tsx` - Main map view
- `GeoArchivePage.stories.tsx` - Province gallery
- `IntelligencePage.stories.tsx` - AI chat (with/without context)

---

## Note on Recent Chats

- Current app behavior now supports multiple conversation threads
- Chats are stored locally and remain until the user deletes them
- The user can create a new chat, switch to an old chat, delete a single chat, or delete the active chat from the header
- Session ID is generated per conversation and sent to n8n for memory-aware workflows

---

## Note on Route Architecture

The app uses **HashRouter** (file:// protocol compatibility):
- `/` → Explore Hub (intent-first landing)
- `/map` → Thai Map (region dashboard + interactive map)
- `/province/:regionId/:provinceId` → Province Detail (Leaflet map + tabs)
- `/intelligence` → AI Chat
- `/analytics` → Situation Feed
- `/travel-guide/:regionId` → Travel Guide (transport + portal data)
- `/settings` → Settings

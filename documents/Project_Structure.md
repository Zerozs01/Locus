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
├── mockup/                   # UI Design Mockups
├── resources/                # Static Resources
├── scripts/
│   └── start_all.bat         # Master Launcher (n8n + Ngrok)
├── src/
│   ├── main/                 # Electron Main Process
│   │   ├── index.ts          # Main entry point
│   │   └── database/         # Local Database Logic
│   │       ├── db.ts         # SQLite Schema & Queries (WAL mode)
│   │       └── initialData.ts # Seeding Data (77 provinces with population/area)
│   ├── preload/              # Electron Preload Scripts
│   │   ├── index.ts          # IPC Bridge
│   │   └── index.d.ts        # Type Definitions
│   ├── renderer/             # React Frontend (Vite)
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx      # React Entry Point
│   │       ├── components/
│   │       │   ├── CachedImage.tsx      # Safe cached image wrapper
│   │       │   ├── ChatOverlay.tsx      # AI Chat Overlay (deprecated)
│   │       │   ├── DataCard.tsx         # Data Display Cards
│   │       │   ├── DetailCard.tsx       # Region Detail Cards
│   │       │   ├── Footer.tsx           # Footer Component
│   │       │   ├── Header.tsx           # Header Component
│   │       │   ├── RegionalIntelBar.tsx # Regional Intelligence Overview Bar
│   │       │   ├── RegionDashboard.tsx  # Region/Province Dashboard
│   │       │   ├── Sidebar.tsx          # Navigation Sidebar
│   │       │   ├── ProvinceMap.tsx      # Leaflet Province Map
│   │       │   ├── ThailandMap.tsx      # Interactive Map (react-simple-maps)
│   │       │   └── *.stories.tsx        # Storybook Stories
│   │       ├── pages/                   # Page Components (React Router)
│   │       │   ├── index.ts             # Page Exports
│   │       │   ├── RadarPage.tsx        # Main Map View (/)
│   │       │   ├── GeoArchivePage.tsx   # Province Gallery & Compare (/archive)
│   │       │   ├── TravelGuidePage.tsx  # Transport Routes (/travel-guide/:regionId)
│   │       │   ├── IntelligencePage.tsx # AI Chat Interface (/intelligence)
│   │       │   ├── ProvinceTacticalPage.tsx # Province Detail (/province/:regionId/:provinceId)
│   │       │   ├── AnalyticsPage.tsx    # Analytics Dashboard (/analytics)
│   │       │   ├── SettingsPage.tsx     # Settings (/settings)
│   │       │   └── *.stories.tsx        # Page Storybook Stories
│   │       ├── views/
│   │       │   └── ArchiveView.tsx      # Archive View Component
│   │       ├── data/
│   │       │   ├── regions.ts           # Region/Province Types & Static Data
│   │       │   └── thaiProvinceNames.ts # Thai-English Province Name Mapping
│   │       ├── services/
│   │       │   └── n8nClient.ts         # n8n API Client
│   │       ├── utils/
│   │       │   ├── imageCache.ts        # Cached image URL helper (locus protocol)
│   │       │   └── perf.ts              # Perf measurement helper
│   │       └── styles/
│   │           └── index.css            # Global Styles (TailwindCSS)
│   ├── shared/               # Shared Types & Interfaces
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

#### 📚 Geo-Archive Page
- ✅ Province gallery with Grid/List view
- ✅ Multi-region filter (rose/cyan/emerald/blue/amber/violet)
- ✅ Sort by name, cost, safety, population
- ✅ Compare mode (up to 3 provinces side-by-side)
- ✅ Thai/English search support
- ✅ List view optimized width
- ✅ Server-side pagination + indexed filtering (`db:getArchiveProvinces`)

#### 🚌 Travel Guide Page
- ✅ Transport routes by region (bus, van, train, plane, boat)
- ✅ Fare calculator with text input + dropdown modes
- ✅ Filter by transport type
- ✅ Route details with via provinces

#### 🤖 Intelligence Page (AI Chat)
- ✅ Context-aware chat from region/province navigation
- ✅ "Chat with AI" button with region-specific colors
- ✅ Image upload support (drag & drop)
- ✅ Suggested queries based on context
- ✅ Canvas panel for structured data

#### 🎨 UI/UX Improvements
- ✅ Region-specific Chat button colors
- ✅ Thai province name mapping (thaiProvinceNames.ts)
- ✅ Keyboard navigation in all search bars
- ✅ Yellow text search styling

---

## Phase 4: AI Integration 🚀

### Goals:
1. **n8n Webhook Integration** - Connect chat to AI workflow
2. **Chat Functionality** - Real-time AI conversation
3. **Province AI Insights** - AI-generated analysis per province
4. **Image Upload** - Location identification via AI vision
5. **LightRAG Integration** - Knowledge base queries

### Technical Tasks:
- [ ] Configure n8nClient.ts for production webhooks
- [ ] Implement chat message persistence (Supabase)
- [ ] Add image upload component
- [ ] Create province detail view with AI panel
- [ ] Setup LightRAG docker container

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
| Northeast | ภาคอีสาน | `text-emerald-400` | `from-emerald-600/20` |
| Central | ภาคกลาง | `text-cyan-400` | `from-cyan-600/20` |
| South | ภาคใต้ | `text-blue-400` | `from-blue-600/20` |
| West | ภาคตะวันตก | `text-amber-400` | `from-amber-600/20` |
| East | ภาคตะวันออก | `text-violet-400` | `from-violet-600/20` |

---

## Storybook Stories

### Components
- `RegionDashboard.stories.tsx` - Region/Province dashboard with all modes

### Pages
- `RadarPage.stories.tsx` - Main map view
- `GeoArchivePage.stories.tsx` - Province gallery
- `TravelGuidePage.stories.tsx` - Transport routes (per region)
- `IntelligencePage.stories.tsx` - AI chat (with/without context)

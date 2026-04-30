# System Architecture

## 1. High-Level Overview

The system follows a specific **"Local-First, Cloud-Sync"** hybrid architecture.

- **Frontend (Brain Interface):** Electron + React (runs locally).
- **Orchestrator (Nervous System):** n8n (runs locally via Docker).
- **Communication Tunnel:** Ngrok (exposes n8n webhooks to internet/public URLs if needed, or local network).
- **Knowledge Base (Long-term Memory):** LightRAG (running locally/Docker) for graph-based retrieval.
- **Data Persistence:** Supabase (PostgreSQL) for structured data and chat history memory.
- **Local Cache & Offline Data:** SQLite (Better-SQLite3) integrated directly into Electron for ultra-fast "Local-First" data access (Regions/Provinces).
  - **IPC Access:** Preload exposes `db:getRegionSummaries`, `db:getRegions`, `db:getRegion`, `db:getProvincesByRegion`, `db:getProvince`, `db:getProvinceIndex`, `db:getArchiveProvinces`, `db:getProvincePortal`, `db:getStats`, `db:saveWeatherAqi`, `db:getWeatherAqi` for renderer data loading.

## 2. Data Flow (Chat & Analysis)

The system uses a **"Tunneling"** method to communicate.

1. **Origin (Renderer):** User presses send on `IntelligencePage.tsx` or `ChatOverlay.tsx`.
2. **IPC Bridge (Preload/Main):** Renderer does not call n8n directly. It uses `window.api.n8n.health()` / `window.api.n8n.chat()` exposed from preload.
3. **Destination (Ngrok URL):** Electron main process calls the configured tunnel endpoint (for example `https://xxxxx.ngrok-free.app/webhook/chat`).
4. **Tunneling (Ngrok -> Localhost):** Ngrok receives the request and **automatically forwards** it through the secure tunnel to your local machine port `5678`.
5. **Processing (n8n):**
    - **Trigger:** The n8n Webhook node (listening on port 5678) activates.
    - **Agent Node:** Queries AI Model.
    - **Tools:** Fetches data from Supabase/LightRAG.
6. **Return Trip:** n8n sends the JSON response back through the tunnel -> Ngrok -> Electron main -> Renderer store.

### Current Chat Contract
- Health check: `GET /webhook/health`
- Chat request: `POST /webhook/chat`
- Chat payload includes `message`, `sessionId`, and optional geo context (`provinceName`, `city`, `regionName`, `country`, `lat`, `lng`)
- Chat response should be a plain JSON object like:
  ```json
  { "output": "..." }
  ```
- Supports endpoint override per-request (`webhookUrl`, `apiKey`)

## 3. Technology Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Styling:** TailwindCSS
- **Map:** react-simple-maps + GeoJSON (region view), Leaflet (province detail)
- **Routing:** React Router v6 (HashRouter for Electron file:// compatibility)
- **State:** React hooks (useState, useEffect, useMemo, useCallback) + Zustand (chatThemeStore)

### Desktop
- **Runtime:** Electron
- **Build:** electron-vite
- **Database:** SQLite (better-sqlite3) with WAL mode
- **Asset Protocol:** `locus://image?url=...` (on-demand image cache)
  - **Cache Controls:** size-limited disk cache (512MB) + clearable from Settings
  - **Streaming:** range requests supported for large images
  - **Reliability:** protocol registered before window creation + fallback SVG for invalid/failed URLs

### Backend/AI
- **Automation:** n8n + Ngrok
- **Database:** Supabase (PostgreSQL)
- **AI/RAG:** LightRAG + OpenRouter/Gemini

### Client-side Chat State
- **Persistent UI History:** Local storage backed conversation store (`locus_intelligence_chat_v3`)
- **Conversation Model:** multi-thread recent chats, active chat selection, delete-per-thread
- **Message Rendering:** in-app lightweight markdown renderer (`MarkdownLite`)

## 4. Application Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | GeoArchivePage (Explore Hub) | Main intent-driven entry point & guided discovery |
| `/map` | ThreatRadarPage | Main interactive map view & region dashboard |
| `/province/:regionId/:provinceId` | ProvinceTacticalPage | Province detailed terrain and data view |
| `/travel-guide/:regionId` | TravelGuidePage | Travel routes, transport, portal data, route planner |
| `/intelligence` | IntelligencePage | AI chat with context support and recent chats |
| `/analytics` | AnalyticsPage | Data analytics dashboard (Situation Feed) |
| `/settings` | SettingsPage | App configuration |

## 5. Key Features

### Search System
- **Thai/English Support:** Uses `thaiProvinceNames.ts` mapping + Nominatim geocoding with `accept-language=th,en`
- **Keyboard Navigation:** Arrow Up/Down, Enter, Escape
- **Auto-suggest:** Max 6-8 results with highlighting
- **Auto-Focus:** Cross-page search focus styling with glow effect

### Explore Hub (Landing)
- **Known Destination:** Direct routing to Map with pre-filled search
- **Guided Discovery:** 5-step interactive questionnaire mapping user intent
- **Editable Intent Summary:** Connects directly to AI Intelligence page

### Region Dashboard
- **Region Mode:** Travel stats overview (Daily Cost, PM2.5 AQI, Attractions, Best Season)
- **Province Mode:** 3-column gallery with province cards
- **Chat Integration:** Context-aware navigation to AI chat

### Province Detail (Tactical Page)
- **Interactive Map:** Leaflet-based province map with multiple themes (voyager, positron, dark, osm, satellite, terrain, admin)
- **Data Layers:** Toggleable overlays for traffic, GISTDA AQI, AQICN AQI, rain radar, flood recurrent, EV chargers, slope
- **Tabs:** Condensed single-row navigation for Overview, Stay, Food & Supply, Transit, Critical
- **Live Weather/AQI:** Real-time sync from SQLite (10s polling + event-based `AQI_SYNC_EVENT`)
- **UX Context:** Current season indicator calculated locally

### Travel Guide Page
- **Transport Hub:** Company cards by transport type (bus, rail, van, plane, boat, songthaew, etc.)
- **Route Planner:** Origin/destination inputs with Nominatim search, date picker, speed/price sorting
- **Traffic Modeling:** Traffic penalty by transport type + seasonal conditions
- **Portal Data:** Essential data (supply, knowledge, ecology, emergency, local foods)
- **Ecology Browser:** Fauna, flora, terrain, climate entity categories
- **Danger Zones:** Hotspot visualization + province news panel

### AI Chat (Intelligence Page)
- **Fluid Layout:** Auto-expanding chat input window anchored bottom-right
- **Context Passing:** Receives region/province/intent data from navigation state
- **Image Upload:** Drag & drop support
- **Suggested Queries:** Dynamic based on context
- **Recent Chats:** Multi-conversation history stored locally in app
- **Background Reply Handling:** Pending reply can complete while user navigates to other pages in the app
- **Markdown Rendering:** Basic headings, bullets, emphasis, line breaks rendered client-side

## 6. Why No Redis?

Current architecture uses **PostgreSQL (Supabase)** which is sufficient for:

- Vector storage (pgvector).
- Chat history (structured relational data).
- JSON document storage.

For a single-user or small-group local-first app, Redis adds unnecessary complexity. PostgreSQL interactions in this scale are near-instant. Redis should only be considered if concurrent traffic scales significantly (>1000s req/sec) or for specific pub/sub limits not met by Supabase Realtime.

## 7. Code Structure Ref

### Main Process (`src/main/index.ts`)
- Electron main process entry point
- IPC handlers for `db:*`, `n8n:*`, `map:*`, `assets:*`, `config:*`
- Rain radar tile template resolution (RainViewer + OpenWeather fallback)
- EV charger search (OpenChargeMap API)
- GISTDA feature fetching with dedicated no-proxy session
- Image protocol registration and cache management

### Preload (`src/preload/index.ts`)
- Exposes `window.api` bridge to renderer (context-isolated)
- Channels: `db`, `n8n`, `map`, `assets`, `config`

### Renderer Services
- `src/renderer/src/services/n8nClient.ts`: Renderer-side n8n client and session id handling
- `src/renderer/src/services/intelligenceChatStore.ts`: Persistent multi-conversation chat store
- `src/renderer/src/services/chatThemeStore.ts`: Chat theme state (Zustand)

### Renderer Pages
- `src/renderer/src/pages/IntelligencePage.tsx`: Main AI chat interface with recent chats
- `src/renderer/src/components/ChatOverlay.tsx`: Overlay view sharing the same chat state
- `src/renderer/src/pages/ProvinceTactical/index.tsx`: Province tactical detail page
- `src/renderer/src/pages/TravelGuide/index.tsx`: Travel guide hub
- `src/renderer/src/components/ProvinceMap.tsx`: Leaflet-based province map component
- `src/renderer/src/components/ThailandMap.tsx`: Interactive region map (react-simple-maps)

### Renderer Data
- `src/renderer/src/data/thaiProvinceNames.ts`: Thai-English province mapping
- `src/renderer/src/data/regions.ts`: Region/Province data structures
- `src/renderer/src/data/coordinates.ts`: Province coordinates
- `src/renderer/src/data/regionTheme.ts`: Renderer re-export of shared region theme
- `src/shared/regionTheme.ts`: Region color/gradient single source of truth
- `src/shared/types.ts`: Core TypeScript interfaces

### Renderer Utilities
- `src/renderer/src/utils/aqi.ts`: AQI utilities + AQI_SYNC_EVENT
- `src/renderer/src/utils/perf.ts`: Performance measurement helper (measureAsync)
- `src/renderer/src/utils/color.ts`: Color utilities (toRgba)
- `src/renderer/src/utils/imageCache.ts`: Cached image URL helper
- `src/renderer/src/utils/csvDb.ts`: CSV-based DB fallback

## 8. Database Schema Summary

| Table | Purpose |
|-------|---------|
| `regions` | 6 region records with metadata |
| `region_stats` | Per-region travel stats (cost, food, flora, attractions, nightlife) |
| `provinces` | 77 province records with population, area, daily cost, safety |
| `province_portal` | Extended province data (transport, supply, knowledge, ecology, emergency, etc.) |
| `weather_aqi` | Time-series weather/AQI records per province per date |

## 9. Map & Weather Integration

- **Rain Radar:** RainViewer API primary + OpenWeather precipitation fallback
- **Weather Sync:** `db:saveWeatherAqi` / `db:getWeatherAqi` IPC + 10s polling + `AQI_SYNC_EVENT`
- **EV Chargers:** OpenChargeMap API via `map:searchEvChargers`
- **Province Map Themes:** voyager, positron, dark, osm, satellite, terrain, admin (Leaflet)
- **Province Data Layers:** traffic, gistdaAqi, aqicnAqi, rainRadar, floodRecurrent, evCharger, slope
- **GISTDA Features:** Dedicated no-proxy session for CORS-free API access

## 10. Runtime Configuration

Runtime config persisted via `config:get` / `config:set` IPC:
- `ngrok` / `VITE_NGROK_URL`: n8n webhook base URL
- `n8n_api_key` / `VITE_N8N_API_KEY`: Optional API key for n8n
- `openweather` / `VITE_OPENWEATHER_API_KEY`: OpenWeather API key
- `news_api_url`: Province news API endpoint

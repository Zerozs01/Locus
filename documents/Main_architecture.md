# System Architecture

## 1. High-Level Overview

The system follows a specific **"Local-First, Cloud-Sync"** hybrid architecture.

- **Frontend (Brain Interface):** Electron + React (runs locally).
- **Orchestrator (Nervous System):** n8n (runs locally via Docker).
- **Communication Tunnel:** Ngrok (exposes n8n webhooks to internet/public URLs if needed, or local network).
- **Knowledge Base (Long-term Memory):** LightRAG (running locally/Docker) for graph-based retrieval.
- **Data Persistence:** Supabase (PostgreSQL) for structured data and chat history memory.
- **Local Cache & Offline Data:** SQLite (Better-SQLite3) integrated directly into Electron for ultra-fast "Local-First" data access (Regions/Provinces).
  - **IPC Access:** Preload exposes `db:getRegionSummaries`, `db:getRegions`, `db:getRegion`, `db:getProvincesByRegion`, `db:getProvince`, `db:getProvinceIndex`, `db:getArchiveProvinces`, `db:getStats` for renderer data loading.

## 2. Data Flow (Chat & Analysis)

The system uses a **"Tunneling"** method to communicate.

1.  **Origin (Renderer):** User presses send on `IntelligencePage.tsx` or `ChatOverlay.tsx`.
2.  **IPC Bridge (Preload/Main):** Renderer does not call n8n directly. It uses `window.api.n8n.health()` / `window.api.n8n.chat()` exposed from preload.
3.  **Destination (Ngrok URL):** Electron main process calls the configured tunnel endpoint (for example `https://xxxxx.ngrok-free.app/webhook/chat`).
4.  **Tunneling (Ngrok -> Localhost):** Ngrok receives the request and **automatically forwards** it through the secure tunnel to your local machine port `5678`.
5.  **Processing (n8n):**
    - **Trigger:** The n8n Webhook node (listening on port 5678) activates.
    - **Agent Node:** Queries AI Model.
    - **Tools:** Fetches data from Supabase/LightRAG.
6.  **Return Trip:** n8n sends the JSON response back through the tunnel -> Ngrok -> Electron main -> Renderer store.

### Current Chat Contract
- Health check: `GET /webhook/health`
- Chat request: `POST /webhook/chat`
- Chat payload includes `message` and `sessionId`
- Chat response should be a plain JSON object like:
  ```json
  { "output": "..." }
  ```

## 3. Technology Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Styling:** TailwindCSS
- **Map:** react-simple-maps + GeoJSON (region view), Leaflet (province detail)
- **Routing:** React Router v6
- **State:** React hooks (useState, useEffect, useMemo)

### Desktop
- **Runtime:** Electron
- **Build:** electron-vite
- **Database:** SQLite (better-sqlite3) with WAL mode
- **Asset Protocol:** `locus://image?url=...` (on-demand image cache)
  - **Cache Controls:** size-limited disk cache + clearable from Settings
  - **Streaming:** range requests supported for large images
  - **Reliability:** protocol registered before window creation + fallback image for invalid/failed URLs

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
| `/` | ThreatRadarPage | Main map view with region dashboard |
| `/province/:regionId/:provinceId` | ProvinceTacticalPage | Province tactical detail with Leaflet map |
| `/archive` | GeoArchivePage | Province gallery with compare mode |
| `/travel-guide/:regionId` | TravelGuidePage | Hybrid travel routes with tactical overlay |
| `/intelligence` | IntelligencePage | AI chat with context support and recent chats |
| `/analytics` | AnalyticsPage | Data analytics dashboard |
| `/settings` | SettingsPage | App configuration |

## 5. Key Features

### Search System
- **Thai/English Support:** Uses `thaiProvinceNames.ts` mapping
- **Keyboard Navigation:** Arrow Up/Down, Enter, Escape
- **Auto-suggest:** Max 6 results with highlighting

### Region Dashboard
- **Region Mode:** Stats overview (costs, food, attractions)
- **Province Mode:** 3-column gallery with cards
- **Chat Integration:** Context-aware navigation to AI chat

### Province Tactical (Detail Page)
- **Interactive Map:** Leaflet map with markers and center pin
- **Tabs:** Explore, Stay, Eat & Drink, Getting Around, Essentials

### AI Chat (Intelligence Page)
- **Context Passing:** Receives region/province data from navigation state
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

- `src/main/index.ts`: Electron main process, IPC handlers for `n8n:health` and `n8n:chat`.
- `src/preload/index.ts`: exposes `window.api.n8n.*` bridge to renderer.
- `src/renderer/src/services/n8nClient.ts`: Renderer-side n8n client and session id handling.
- `src/renderer/src/services/intelligenceChatStore.ts`: Persistent multi-conversation chat store.
- `src/renderer/src/pages/IntelligencePage.tsx`: Main AI chat interface with recent chats.
- `src/renderer/src/components/ChatOverlay.tsx`: Overlay view sharing the same chat state.
- `src/renderer/src/components/MarkdownLite.tsx`: Lightweight markdown renderer for chat output.
- `src/renderer/src/pages/ProvinceTactical/index.tsx`: Province tactical detail page.
- `src/renderer/src/components/ProvinceMap.tsx`: Leaflet-based province map component.
- `src/renderer/src/data/thaiProvinceNames.ts`: Thai-English province mapping.
- `src/renderer/src/data/regions.ts`: Region/Province data structures.
- `src/shared/regionTheme.ts`: Region color/gradient single source of truth.


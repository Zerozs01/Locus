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

1.  **Origin (Electron):** User presses send. The app initiates a POST request.
2.  **Destination (Ngrok URL):** The request acts as if it's going to the internet (e.g., `https://xxxxx.ngrok-free.app/webhook/chat`).
3.  **Tunneling (Ngrok -> Localhost):** Ngrok receives the request and **automatically forwards** it through the secure tunnel to your local machine port `5678`.
4.  **Processing (n8n):**
    - **Trigger:** The n8n Webhook node (listening on port 5678) activates.
    - **Agent Node:** Queries AI Model.
    - **Tools:** Fetches data from Supabase/LightRAG.
5.  **Return Trip:** n8n sends the JSON response back through the tunnel -> Ngrok -> Electron App.

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

### Backend/AI
- **Automation:** n8n + Ngrok
- **Database:** Supabase (PostgreSQL)
- **AI/RAG:** LightRAG + OpenRouter/Gemini

## 4. Application Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | RadarPage | Main map view with region dashboard |
| `/province/:regionId/:provinceId` | ProvinceTacticalPage | Province tactical detail with Leaflet map |
| `/archive` | GeoArchivePage | Province gallery with compare mode |
| `/travel-guide/:regionId` | TravelGuidePage | Transport routes & fare calculator |
| `/intelligence` | IntelligencePage | AI chat with context support |
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

## 6. Why No Redis?

Current architecture uses **PostgreSQL (Supabase)** which is sufficient for:

- Vector storage (pgvector).
- Chat history (structured relational data).
- JSON document storage.

For a single-user or small-group local-first app, Redis adds unnecessary complexity. PostgreSQL interactions in this scale are near-instant. Redis should only be considered if concurrent traffic scales significantly (>1000s req/sec) or for specific pub/sub limits not met by Supabase Realtime.

## 7. Code Structure Ref

- `src/renderer/src/services/n8nClient.ts`: Handles axios calls to n8n.
- `src/renderer/src/pages/IntelligencePage.tsx`: Main AI chat interface.
- `src/renderer/src/pages/ProvinceTacticalPage.tsx`: Province tactical detail page (Leaflet map).
- `src/renderer/src/components/ProvinceMap.tsx`: Leaflet-based province map component.
- `src/renderer/src/data/thaiProvinceNames.ts`: Thai-English province mapping.
- `src/renderer/src/data/regions.ts`: Region/Province data structures.


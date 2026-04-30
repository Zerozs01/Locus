# Locus - Agentic AI for Geospatial Intelligence and Situational Awareness

### 👨‍💻 Developed by: Zeroz (CPE311 AI Lab)

## 📌 Project Overview
An intelligent agent system designed to provide real-time location analysis, historical context, and safety assessment. By integrating computer vision with geospatial data, the system assists users in understanding their surroundings, evaluating travel risks, and discovering cultural heritage.

It follows a **"Local-First"** architecture, ensuring fast performance and offline capabilities while syncing with the cloud for agent coordination.

## 🚀 Tech Stack
- **Frontend:** React 18, TypeScript, Vite, TailwindCSS
- **Desktop Framework:** Electron (electron-vite)
- **UI Development:** Storybook (Component Driven Development)
- **State Management:** React hooks + Zustand (chat theme)
- **Agent Orchestrator:** n8n (Local Deployment via Docker)
- **Database (Hybrid):** 
  - **Local:** SQLite (Better-SQLite3) for ultra-fast offline data and caching.
  - **Cloud:** Supabase (PostgreSQL) for chat history, structured data, and syncing.
- **Knowledge Base:** LightRAG (Graph-based Retrieval)
- **AI Models:** Gemini 1.5 Flash (Vision & Reasoning) via OpenRouter

## ⚙️ Key Features
- **Intent-Driven Workflow:** Dynamic entry points prioritizing user intent (Known Destination, Guided Discovery, Interest-based) over static data browsing.
- **Visual Location Identification:** Analyzing images to identify coordinates or regions using AI "Meta" clues.
- **Local-First Performance:** Instant data access for Regions & Provinces using embedded SQLite with WAL mode.
- **Situational Awareness & Tactical Navigation:** Dynamic GeoJSON mapping, safety assessment, supply locations, and environmental risks on the Province Tactical page.
- **Agent Chat Interface:** Interactive auto-expanding chat with LightRAG/n8n backed responses, recent history, and context-aware region/province prompts.
- **Unified Region Theme:** Single source of truth for region colors/gradients shared between main and renderer.
- **Live Weather & AQI:** Real-time weather/AQI sync from SQLite with 10s polling and event-based updates.
- **Multi-Layer Province Maps:** Leaflet-based maps with themes (voyager, positron, dark, osm, satellite, terrain, admin) and toggleable data layers (traffic, AQI, rain radar, EV chargers, flood, slope).
- **Travel Guide & Route Planner:** Transport company cards, route recommendations with speed/price sorting, traffic penalty modeling, and season-based travel conditions.
- **Ecology & Portal Data:** Extended province data covering transport, supply, knowledge, ecology (fauna/flora/terrain/climate), emergency contacts, local foods, and danger zones.
- **Image Cache Protocol:** `locus://image` protocol with 512MB disk cache, range requests, and fallback handling.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Docker (for n8n & LightRAG)
- Ngrok (for local tunneling)

### Installation
```bash
npm install
```

### Development Scripts
- **Run App:** `npm run dev` (Launches Electron + Vite + SQLite)
- **Run Storybook:** `npm run storybook` (Develop UI components in isolation)
- **Build App:** `npm run build:win`

### Backend Services
- Execute `scripts/start_all.bat` to launch n8n and Ngrok tunnel.

## 🧭 Application Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Explore Hub | Intent-driven landing page with guided discovery |
| `/map` | Threat Radar | Interactive Thailand map + region dashboard |
| `/province/:regionId/:provinceId` | Province Tactical | Province detail with Leaflet map and tabs |
| `/travel-guide/:regionId` | Travel Guide | Transport routes, portal data, route planner |
| `/intelligence` | Intelligence | AI chat with multi-conversation support |
| `/analytics` | Analytics | Situation feed dashboard |
| `/settings` | Settings | App configuration (ngrok URL, cache, etc.) |

##  Intelligence Status
- `Settings -> Ngrok Tunnel URL` now tests both `health` and `chat` webhook reachability
- Renderer talks to n8n through Electron IPC bridge instead of direct browser fetch, reducing CORS issues
- Chat conversations are stored locally in the app and remain until the user deletes them
- Replies can continue processing in the background while the user navigates to other pages in the app
- Chat output supports lightweight markdown rendering in-app (headings, bullets, bold, italics, line breaks)
- Chat payload includes geo context: `provinceName`, `city`, `regionName`, `country`, `lat`, `lng`
- Session ID is generated per conversation and sent to n8n for memory-aware workflows
- n8n endpoint supports per-request override (`webhookUrl`, `apiKey`)

## 📊 Database Tables

| Table | Description |
|-------|-------------|
| `regions` | 6 region records with metadata |
| `region_stats` | Per-region travel stats |
| `provinces` | 77 province records |
| `province_portal` | Extended province data (transport, supply, knowledge, ecology, emergency) |
| `weather_aqi` | Time-series weather/AQI records |

## 🎨 Region Color System

| Region | Thai | Accent Hex | Tailwind |
|--------|------|------------|----------|
| North | ภาคเหนือ | `#a855f7` | violet |
| Northeast | ภาคอีสาน | `#ef4444` | red |
| Central | ภาคกลาง | `#f97316` | orange |
| West | ภาคตะวันตก | `#22c55e` | emerald |
| East | ภาคตะวันออก | `#facc15` | yellow |
| South | ภาคใต้ | `#2563eb` | blue |

> Source: `src/shared/regionTheme.ts`

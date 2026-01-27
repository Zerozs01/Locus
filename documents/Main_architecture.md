# System Architecture

## 1. High-Level Overview

The system follows a specific **"Local-First, Cloud-Sync"** hybrid architecture.

- **Frontend (Brain Interface):** Electron + React (runs locally).
- **Orchestrator (Nervous System):** n8n (runs locally via Docker).
- **Communication Tunnel:** Ngrok (exposes n8n webhooks to internet/public URLs if needed, or local network).
- **Knowledge Base (Long-term Memory):** LightRAG (running locally/Docker) for graph-based retrieval.
- **Data Persistence:** Supabase (PostgreSQL) for structured data and chat history memory.
- **Local Cache & Offline Data:** SQLite (Better-SQLite3) integrated directly into Electron for ultra-fast "Local-First" data access (Regions/Provinces).

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

## 3. Technology Stack Updates

- **Frontend:** React 18, TypeScript, TailwindCSS.
- **Backend/Automation:** n8n + ngrok.
- **Database:** Supabase (PostgreSQL) - Replaces Firebase for structured table/relational needs.
- **AI/RAG:** LightRAG + OpenRouter/Gemini.

## 4. Why No Redis?

Current architecture uses **PostgreSQL (Supabase)** which is sufficient for:

- Vector storage (pgvector).
- Chat history (structured relational data).
- JSON document storage.

For a single-user or small-group local-first app, Redis adds unnecessary complexity. PostgreSQL interactions in this scale are near-instant. Redis should only be considered if concurrent traffic scales significantly (>1000s req/sec) or for specific pub/sub limits not met by Supabase Realtime.

## 5. Code Structure Ref

- `src/renderer/src/services/n8nClient.ts`: Handles axios calls to n8n.
- `src/renderer/src/components/ChatOverlay.tsx`: Chat UI logic.


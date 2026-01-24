# System Architecture

## 1. High-Level Overview

The system follows a specific **"Local-First, Cloud-Sync"** hybrid architecture.

- **Frontend (Brain Interface):** Electron + React (runs locally).
- **Orchestrator (Nervous System):** n8n (runs locally via Docker).
- **Communication Tunnel:** Ngrok (exposes n8n webhooks to internet/public URLs if needed, or local network).
- **Knowledge Base (Long-term Memory):** LightRAG (running locally/Docker) for graph-based retrieval.
- **Data Persistence:** Supabase (PostgreSQL) for structured data and chat history memory.

## 2. Data Flow (Chat & Analysis)

1. **User Input:** User types in Electron Chat Overlay.
2. **Transmission:** Electron `n8nClient` sends POST request to `ngrok-url/webhook/chat`.
3. **Processing (n8n):**
   - **Trigger:** Webhook receives message.
   - **Agent Node:** Queries AI Model (OpenRouter/Gemini).
   - **Tools:**
     - **Memory:** Connects to Supabase (Postgres) to store/retrieve history.
     - **RAG:** Queries LightRAG API for specialized knowledge (e.g., zombie survival, situational awareness).
4. **Response:** n8n returns the answer -> Electron displays it.

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


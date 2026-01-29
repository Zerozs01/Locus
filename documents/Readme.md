# Locus - Agentic AI for Geospatial Intelligence and Situational Awareness

### 👨‍💻 Developed by: Zeroz (CPE311 AI Lab)

## 📌 Project Overview
An intelligent agent system designed to provide real-time location analysis, historical context, and safety assessment. By integrating computer vision with geospatial data, the system assists users in understanding their surroundings, evaluating travel risks, and discovering cultural heritage.

It follows a **"Local-First"** architecture, ensuring fast performance and offline capabilities while syncing with the cloud for agent coordination.

## 🚀 Tech Stack
- **Frontend:** React 18, TypeScript, Vite, TailwindCSS
- **Desktop Framework:** Electron
- **UI Development:** Storybook (Component Driven Development)
- **Agent Orchestrator:** n8n (Local Deployment)
- **Database (Hybrid):** 
  - **Local:** SQLite (Better-SQLite3) for ultra-fast offline data and caching.
  - **Cloud:** Supabase (PostgreSQL) for chat history, structured data, and syncing.
- **Knowledge Base:** LightRAG (Graph-based Retrieval)
- **AI Models:** Gemini 1.5 Flash (Vision & Reasoning) via OpenRouter

## ⚙️ Key Features
- **Visual Location Identification:** Analyzing images to identify coordinates or regions using AI "Meta" clues.
- **Local-First Performance:** Instant data access for Regions & Provinces using embedded SQLite with WAL mode.
- **Situational Awareness:** Assessing safety, supply locations, and environmental risks.
- **Historical & Cultural Insights:** Fetching localized lore and history based on identified landmarks.
- **Agent Chat Interface:** Interactive chat with AI agents capable of controlling the UI.

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
# Locus -Agentic AI for Geospatial Intelligence and Situational Awareness

### 👨‍💻 Developed by: Zeroz (CPE311 AI Lab)

## 📌 Project Overview
An intelligent agent system designed to provide real-time location analysis, historical context, and safety assessment. By integrating computer vision with geospatial data, the system assists users in understanding their surroundings, evaluating travel risks, and discovering cultural heritage.

## 🚀 Tech Stack
- **Frontend:** React 18, TypeScript, Vite
- **Desktop Framework:** Electron
- **Agent Orchestrator:** n8n (Local Deployment)
- **Backend/Database:** Firebase Firestore (Sync Phase)
- **AI Models:** Gemini 1.5 Flash (Vision & Reasoning)
- **APIs:** Google Maps Static API, Wikipedia API, OpenWeather API

## ⚙️ Key Features
- **Visual Location Identification:** Analyzing images to identify coordinates or regions using AI "Meta" clues.
- **Situational Awareness:** Assessing safety, supply locations, and environmental risks.
- **Historical & Cultural Insights:** Fetching localized lore and history based on identified landmarks.
- **Cross-Platform Sync:** Cloud synchronization via Firestore for persistent data access.

## 🛠️ Getting Started
1. **Prerequisites:** Node.js, Docker (for n8n), Ngrok.
2. **Install Dependencies:** `npm install`
3. **Run Development:** `npm run dev` (Launches Electron + Vite)
4. **Start Backend:** Execute `scripts/start_all.bat` to launch n8n and Ngrok tunnel.
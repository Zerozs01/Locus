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
│   │       ├── App.tsx       # Main App Component
│   │       ├── main.tsx      # React Entry Point
│   │       ├── components/
│   │       │   ├── ChatOverlay.tsx      # AI Chat Interface
│   │       │   ├── DataCard.tsx         # Data Display Cards
│   │       │   ├── DetailCard.tsx       # Region Detail Cards
│   │       │   ├── Footer.tsx           # Footer Component
│   │       │   ├── Header.tsx           # Header Component
│   │       │   ├── RegionDashboard.tsx  # Region/Province Dashboard
│   │       │   ├── Sidebar.tsx          # Navigation Sidebar
│   │       │   ├── ThailandMap.tsx      # Interactive Map (react-simple-maps)
│   │       │   └── *.stories.tsx        # Storybook Stories
│   │       ├── data/
│   │       │   └── regions.ts           # Region/Province Types & Static Data
│   │       ├── services/
│   │       │   └── n8nClient.ts         # n8n API Client
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
- **regions**: id, name, engName, code, desc, color, gradient, image, safety, population, area, province_count
- **region_stats**: region_id, dailyCost, monthlyCost, food, flora, attraction, nightlife
- **provinces**: id, region_id, name, image, dist, tam, serenity, entertainment, relax, population, area, dailyCost, safety

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

## Phase 3: AI Integration 🚀

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

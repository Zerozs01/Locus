survivor-agent-app/
├── src/
│   ├── main/                 # Electron Main Process
│   │   └── main.ts
│   ├── renderer/             # React Frontend (Vite)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   │   └── useFirestore.ts
│   │   │   ├── services/
│   │   │   │   └── n8nClient.ts
│   │   │   └── App.tsx
│   │   └── index.html
│   └── shared/               # Types & Interfaces
├── scripts/
│   └── start_all.bat         # Master Launcher
├── firebaseConfig.ts         # Firebase Initialization
├── package.json
└── README.md
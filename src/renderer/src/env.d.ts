/// <reference types="vite/client" />

// Image module declarations
declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_NGROK_URL: string
  readonly VITE_N8N_API_KEY: string
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_LONGDO_MAP_API_KEY?: string
  readonly VITE_AQICN_TILE_TOKEN?: string
  readonly VITE_OPENCHARGEMAP_API_KEY?: string
  readonly VITE_MAP_THEME_SATELLITE_URL?: string
  readonly VITE_MAP_THEME_TERRAIN_URL?: string
  readonly VITE_MAP_LAYER_TRAFFIC_URL?: string
  readonly VITE_MAP_LAYER_GISTDA_URL?: string
  readonly VITE_MAP_LAYER_AQICN_URL?: string
  readonly VITE_MAP_LAYER_RAIN_URL?: string
  readonly VITE_MAP_LAYER_FLOOD_RECURRENT_URL?: string
  readonly VITE_MAP_LAYER_FLOOD_RECURRENT_LAYER?: string
  readonly VITE_MAP_LAYER_FLOOD_RECURRENT_STYLE?: string
  readonly VITE_MAP_LAYER_FLOOD_RECURRENT_FILTER?: string
  readonly VITE_MAP_LAYER_RAIN_FILTER?: string
  readonly VITE_MAP_LAYER_SLOPE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_PLACE_API_KEY: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
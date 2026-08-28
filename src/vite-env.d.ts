/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SYSTEMS_LIVE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

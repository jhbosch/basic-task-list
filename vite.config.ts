/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/tasks": "http://localhost:8000",
    }
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./setupTest.ts"],
  }
})

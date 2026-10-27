import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // React + GSAP + Motion animations land in one ~217 kB (gzip) bundle.
    chunkSizeWarningLimit: 700,
  },
})

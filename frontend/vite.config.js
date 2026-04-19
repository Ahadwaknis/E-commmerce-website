import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js' // Re-enable PostCSS with correct Tailwind setup
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
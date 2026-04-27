import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'xterm': ['xterm', '@xterm/addon-fit'],
          'react-router': ['react-router-dom'],
        }
      }
    }
  }
})

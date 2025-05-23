import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: process.cwd(), // Explicitly set the root directory
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: 3000,
    historyApiFallback: true,
  },
  // Add history fallback for SPA routing
  preview: {
    port: 3000,
    historyApiFallback: true,
  },
})

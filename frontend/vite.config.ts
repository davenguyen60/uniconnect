import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Fix lỗi Docker không hot-reload (chuẩn bị cho tương lai)
    },
    host: true, // Để Docker map port được
    strictPort: true,
    port: 5173, 
  }
})
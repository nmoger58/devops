import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'devops-4-gh8z.onrender.com',
      'devops-2-3ugm.onrender.com',
      'localhost',
    ]
  },
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: 'https://devops-2-3ugm.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

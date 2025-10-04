import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['devops-2-3ugm.onrender.com', '.ngrok-free.app', '.onrender.com']
  }
})

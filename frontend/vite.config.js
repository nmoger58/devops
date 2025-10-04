import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'devops-3-d99e.onrender.com', // Render domain
      'localhost', // optional for local dev
    ]
  }
})


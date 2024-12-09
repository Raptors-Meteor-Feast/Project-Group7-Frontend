import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [react()],
  base: '/', // หรือ path ที่ตรงกับ subpath ที่ Vercel ใช้
})

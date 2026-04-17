import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081,
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})

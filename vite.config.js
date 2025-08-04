import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  //Hogy külön dns-en is elérhető legyen a web
  server:{
    host: true,
    allowedHosts:['tisztavaros.duckdns.org']
  }
})

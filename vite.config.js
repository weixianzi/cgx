import { fileURLToPath, URL } from 'node:url'
import path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve("src")
    }
  },
  server:{
    port:8080,
    proxy:{
      "/api":{
        target:"http://chst.vip",
        rewrite:(path)=>path.replace(/^\/api/,"")
      }
    }
  }
})

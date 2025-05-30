import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // css:{
  //   preprocessorOptions: {
  //     scss:{
  //       additionalData: `
  //         @import "./src/styles/_variables.scss;
  //         @import "./src/styles/_mixins.scss";
  //       `
  //     }
  //   }
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

import { URL, fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue2 from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue2(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

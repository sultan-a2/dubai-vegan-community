import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/dubai-vegan-community/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        edition: resolve(import.meta.dirname, 'edition.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        events: resolve(import.meta.dirname, 'events.html'),
        recipes: resolve(import.meta.dirname, 'recipes.html'),
        places: resolve(import.meta.dirname, 'places.html'),
        products: resolve(import.meta.dirname, 'products.html'),
        offers: resolve(import.meta.dirname, 'offers.html'),
        guide: resolve(import.meta.dirname, 'guide.html')
      }
    }
  }
})

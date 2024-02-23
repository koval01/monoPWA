import { defineConfig } from 'vite'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        cleanupOutdatedCaches: true
      },
      manifest: {
        "name": "MonoPWA",
        "short_name": "MonoPWA",
        "description": "MonoPWA is a minimalistic lightweight version of your favorite Monobank.",
        "start_url": "./",
        "icons": [
            {
                "src": "/icons/android-chrome-192x192.png?v=2",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/icons/android-chrome-512x512.png?v=2",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "screenshots" : [{
          "src": "/icons/screenshot.jpg",
          "sizes": "800x800",
          "type": "image/jpeg"
        }],
        "theme_color": "#000000",
        "background_color": "#000000",
        "display": "standalone"
      }    
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      ecma: 5,
      compress: {
        unsafe: true,
        drop_console: true,
        booleans_as_integers: true
      }
    }
  }
})

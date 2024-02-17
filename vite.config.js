import { defineConfig } from 'vite'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        "name": "MonoPWA",
        "short_name": "MonoPWA",
        "icons": [
            {
                "src": "/icons/android-chrome-192x192.png?v=1",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/icons/android-chrome-512x512.png?v=1",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "theme_color": "#000000",
        "background_color": "#000000",
        "display": "standalone"
      }    
    })
  ],
})

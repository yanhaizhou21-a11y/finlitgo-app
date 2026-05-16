import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
// Dev proxy: client uses it by default (see services/supabase.js). Strip Cookie to avoid HTTP 431.
// Set VITE_SUPABASE_DEV_PROXY=false to talk to Supabase directly from the browser.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.join(__dirname, '..'), '')
  const supabaseTarget = env.VITE_SUPABASE_URL || ''

  return {
    plugins: [react(), tailwindcss()],
    envDir: '../',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: supabaseTarget
        ? {
            '/supabase-proxy': {
              target: supabaseTarget,
              changeOrigin: true,
              rewrite: (p) => p.replace(/^\/supabase-proxy/, ''),
              secure: true,
              ws: true,
              configure: (proxy) => {
                proxy.on('proxyReq', (proxyReq) => {
                  proxyReq.removeHeader('cookie')
                  proxyReq.removeHeader('Cookie')
                })
              },
            },
          }
        : {},
    },
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1600,
    },
  }
})

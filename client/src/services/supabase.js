import { createClient } from '@supabase/supabase-js'

const configuredUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Dev: default route via Vite `/supabase-proxy` (avoids browser→Cloudflare 520 + bogus CORS).
 * Proxy strips cookies (see vite.config.js) to avoid HTTP 431.
 * Disable with VITE_SUPABASE_DEV_PROXY=false in root .env.
 */
function resolveSupabaseUrl() {
  const proxyDisabled = import.meta.env.VITE_SUPABASE_DEV_PROXY === 'false'
  if (!import.meta.env.DEV || proxyDisabled || typeof window === 'undefined') {
    return configuredUrl
  }
  return `${window.location.origin}/supabase-proxy`
}

if (!configuredUrl || !supabaseKey) {
  console.error("ENV ERROR:", import.meta.env)
  throw new Error("Missing Supabase env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.")
}

/** Stable key so session survives proxy vs direct URL; logout wipes this + any legacy sb-* keys. */
const AUTH_STORAGE_KEY = "finlitgo-web-auth"

/**
 * Remove every Supabase/Gotrue session bucket (fixes "logout works but refresh still logged in"
 * when multiple sb-* keys exist or signOut did not clear storage).
 */
export function clearSupabaseBrowserSession() {
  if (typeof window === "undefined") return
  const stripStore = (store) => {
    const keys = []
    for (let i = 0; i < store.length; i++) {
      const k = store.key(i)
      if (!k) continue
      if (k.startsWith("sb-") || k === AUTH_STORAGE_KEY || k.includes("supabase.auth")) {
        keys.push(k)
      }
    }
    keys.forEach((k) => {
      try {
        store.removeItem(k)
      } catch {
        /* ignore */
      }
    })
  }
  try {
    stripStore(window.localStorage)
    stripStore(window.sessionStorage)
  } catch {
    /* ignore */
  }
}

export const supabase = createClient(resolveSupabaseUrl(), supabaseKey, {
  auth: {
    storageKey: AUTH_STORAGE_KEY,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

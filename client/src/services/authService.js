const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export async function login(credentials) {
  // TODO: implement real fetch
  return {
    ok: true,
    data: {
      token: 'fake-token',
      user: { name: 'Demo', email: credentials.email },
    },
  }
}

export async function register(payload) {
  return { ok: true, data: { user: { ...payload } } }
}

export async function requestPasswordRecovery(email) {
  return { ok: true }
}

export async function createNewPassword({ token, password }) {
  return { ok: true }
}

export async function verifyIdentity(payload) {
  return { ok: true }
}

export async function verifyPhone(payload) {
  return { ok: true }
}

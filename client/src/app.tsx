import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  const fetchUser = useAuthStore(s => s.fetchUser)
  useEffect(() => { fetchUser() }, []) // bootstrap session on app load

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
```

---

### `client/.env`
```
VITE_API_URL=http://localhost:5000
```

### `.env` (root or `server/`)
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=a_long_random_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🗂️ Final File Map
```
project-root/
├── client/src/
│   ├── services/authService.ts       ← axios calls to backend
│   ├── store/authStore.ts            ← Zustand global auth state
│   ├── hooks/useAuth.ts              ← auto-fetch user on mount
│   ├── components/ProtectedRoute.tsx ← guards private pages
│   └── pages/Login.tsx
│
└── server/src/
    ├── config/passport.js            ← Google Strategy setup
    ├── controllers/authController.js ← login/me/logout handlers
    ├── middleware/authMiddleware.js   ← JWT cookie verifier
    ├── models/userModel.js           ← find or create user in DB
    └── routes/authRoutes.js          ← /api/auth/* routes
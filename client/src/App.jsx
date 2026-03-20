import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PasswordRecovery from './pages/auth/PasswordRecovery'
import CreateNewPassword from './pages/auth/CreateNewPassword'
import VerifyIdentity from './pages/auth/VerifyIdentity'
import VerifyPhone from './pages/auth/VerifyPhone'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-[#3f2bd6] via-[#4a2fbf] to-[#251459] text-white">
        <main className="mx-auto w-full max-w-6xl px-4 py-5 md:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
            <Route path="/create-password" element={<CreateNewPassword />} />
            <Route path="/verify-identity" element={<VerifyIdentity />} />
            <Route path="/verify-phone" element={<VerifyPhone />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

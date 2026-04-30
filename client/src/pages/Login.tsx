import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { login } = useAuth()
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={login}>Sign in with Google</button>
    </div>
  )
}
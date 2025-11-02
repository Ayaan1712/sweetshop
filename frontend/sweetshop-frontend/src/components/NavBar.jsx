import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar() {
  const { token, logout } = useAuth()
  return (
    <nav style={{ display:'flex', gap:12, padding:12, borderBottom:'1px solid #eee' }}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/admin">Admin</Link>
      {token && <button onClick={logout}>Logout</button>}
    </nav>
  )
}

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { token, user } = useAuth()
  if (!token) {
    return <p>Please log in to continue. <a href="/login">Go to Login</a></p>
  }
  if (requireAdmin && user && user.is_admin === false) {
    return <p>Admin only.</p>
  }
  return children
}

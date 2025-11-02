import { createContext, useContext, useEffect, useState } from 'react'
import { post } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null) // {username, is_admin} (optional extension)

  const login = async (username, password) => {
    const { data } = await post('/auth/login', { username, password })
    localStorage.setItem('token', data.access_token)
    setToken(data.access_token)
    // optionally fetch profile here if you add an endpoint
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    if (!token) return
    // could decode token or fetch /me if implemented
  }, [token])

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

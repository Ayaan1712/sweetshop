import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
      navigate('/')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Log In</button>
      </form>
      {error && <p role="alert" className="error">{error}</p>}
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  )
}


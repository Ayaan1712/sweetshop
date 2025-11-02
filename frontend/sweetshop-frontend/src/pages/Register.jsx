import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../api/client'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await post('/auth/register', { username, password })
      navigate('/login')
    } catch (err) {
      setError('Username already exists')
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" value={username} onChange={e => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Create Account</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </div>
  )
}

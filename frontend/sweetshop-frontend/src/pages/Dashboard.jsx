import { useEffect, useState } from 'react'
import { get, post } from '../api/client'
import SweetCard from '../components/SweetCard'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const [sweets, setSweets] = useState([])
  const [q, setQ] = useState('')
  const { token } = useAuth()

  const fetchAll = async () => {
    const { data } = await get('/sweets')
    setSweets(data)
  }
  const search = async () => {
    const { data } = await get(`/sweets/search?name=${encodeURIComponent(q)}`)
    setSweets(data)
  }
  const purchase = async (sweet) => {
    await post(`/sweets/${sweet.id}/purchase`)
    fetchAll()
  }

  useEffect(() => { fetchAll() }, [])

  return (
    <div style={{ maxWidth: 900, margin: '20px auto' }}>
      <h2>Sweets</h2>
      <div>
        <input placeholder="Search by name..." value={q} onChange={e => setQ(e.target.value)} />
        <button onClick={search}>Search</button>
        <Link to="/admin" style={{ marginLeft: 12 }}>Admin</Link>
      </div>
      <div style={{ display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', marginTop: 12 }}>
        {sweets.map(s => (
          <SweetCard key={s.id} sweet={s} onPurchase={token ? purchase : undefined} />
        ))}
      </div>
    </div>
  )
}

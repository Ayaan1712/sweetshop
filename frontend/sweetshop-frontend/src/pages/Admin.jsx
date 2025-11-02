import { useEffect, useState } from 'react'
import { get, post, put, delete as del } from '../api/client'
import ProtectedRoute from '../routes/ProtectedRoute'
import SweetCard from '../components/SweetCard'

export default function Admin() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminInner />
    </ProtectedRoute>
  )
}

function AdminInner() {
  const [sweets, setSweets] = useState([])
  const [form, setForm] = useState({ name:'', category:'', price:'', quantity:'' })

  const fetchAll = async () => {
    const { data } = await get('/sweets')
    setSweets(data)
  }
  useEffect(() => { fetchAll() }, [])

  const createSweet = async (e) => {
    e.preventDefault()
    await post('/sweets', { ...form, price: Number(form.price), quantity: Number(form.quantity) })
    setForm({ name:'', category:'', price:'', quantity:'' })
    fetchAll()
  }

  const editSweet = async (sweet) => {
    const price = prompt('New price', String(sweet.price))
    if (!price) return
    await put(`/sweets/${sweet.id}`, { price: Number(price) })
    fetchAll()
  }

  const deleteSweet = async (sweet) => {
    if (!confirm('Delete sweet?')) return
    await del(`/sweets/${sweet.id}`)
    fetchAll()
  }

  const restockSweet = async (sweet) => {
    await post(`/sweets/${sweet.id}/restock`)
    fetchAll()
  }

  return (
    <div style={{ maxWidth: 900, margin: '20px auto' }}>
      <h2>Admin</h2>
      <form onSubmit={createSweet} style={{ display:'grid', gap:8, gridTemplateColumns:'repeat(5,1fr)' }}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
        <input placeholder="Category" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}/>
        <input placeholder="Price" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))}/>
        <input placeholder="Qty" value={form.quantity} onChange={e=>setForm(f=>({...f,quantity:e.target.value}))}/>
        <button type="submit">Add</button>
      </form>

      <div style={{ display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', marginTop: 12 }}>
        {sweets.map(s => (
          <SweetCard
            key={s.id}
            sweet={s}
            isAdmin
            onEdit={editSweet}
            onDelete={deleteSweet}
            onPurchase={undefined}
          />
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        {sweets.map(s => (
          <button key={s.id} onClick={() => restockSweet(s)} style={{ marginRight: 8 }}>
            Restock {s.name}
          </button>
        ))}
      </div>
    </div>
  )
}

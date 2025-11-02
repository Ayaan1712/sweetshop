export default function SweetCard({ sweet, onPurchase, onEdit, onDelete, isAdmin }) {
  return (
    <div style={{ border:'1px solid #ddd', padding:12, borderRadius:8 }}>
      <h3>{sweet.name}</h3>
      <p>{sweet.category} · ₹{sweet.price} · Qty: {sweet.quantity}</p>
      <button disabled={sweet.quantity <= 0} onClick={() => onPurchase?.(sweet)}>Purchase</button>
      {isAdmin && (
        <>
          <button onClick={() => onEdit?.(sweet)}>Edit</button>
          <button onClick={() => onDelete?.(sweet)}>Delete</button>
        </>
      )}
    </div>
  )
}

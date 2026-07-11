import { useState } from 'react'
import type { Availability, ProductRequest } from '../types/types'

interface Props {
  initial?: ProductRequest
  submitLabel: string
  onSubmit: (data: ProductRequest) => Promise<void>
}

const empty: ProductRequest = {
  name: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
  imageUrl: '',
  availability: 'DISPONIBLE',
}

const ProductForm = ({ initial, submitLabel, onSubmit }: Props) => {
  const [form, setForm] = useState<ProductRequest>(initial ?? empty)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmit(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </label>
      <label>
        Descripcion
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </label>
      <label>
        Categoria
        <input
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
      </label>
      <label>
        Precio
        <input
          type="number"
          step="0.01"
          min="0"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
      </label>
      <label>
        Stock
        <input
          type="number"
          min="0"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
        />
      </label>
      <label>
        Imagen (URL)
        <input
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
      </label>
      <label>
        Disponibilidad
        <select
          value={form.availability}
          onChange={(e) =>
            setForm({ ...form, availability: e.target.value as Availability })
          }
        >
          <option value="DISPONIBLE">DISPONIBLE</option>
          <option value="AGOTADO">AGOTADO</option>
          <option value="PROXIMAMENTE">PROXIMAMENTE</option>
        </select>
      </label>
      <button type="submit" disabled={saving}>
        {saving ? 'Guardando...' : submitLabel}
      </button>
    </form>
  )
}

export default ProductForm
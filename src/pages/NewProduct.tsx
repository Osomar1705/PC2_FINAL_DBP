import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../Components/ProductForm'
import { createProduct } from '../api/api'
import { getErrorMessage } from '../utils/errors'
import type { ProductRequest } from '../types/types'

const NewProduct = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleCreate = async (data: ProductRequest) => {
    setError('')
    try {
      const res = await createProduct(data)
      navigate(`/products/${res.data.id}`)
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <div className="form-box">
      <h2>Nuevo producto</h2>
      {error && <p className="error">{error}</p>}
      <ProductForm submitLabel="Crear" onSubmit={handleCreate} />
    </div>
  )
}

export default NewProduct
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../Components/ProductForm'
import { deleteProduct, getProduct, updateProduct } from '../api/api'
import { getErrorMessage } from '../utils/errors'
import type { ProductRequest, ProductResponse } from '../types/types'

const ProductDetail = () => {
  const { id } = useParams()
  const productId = Number(id)
  const navigate = useNavigate()

  const [product, setProduct] = useState<ProductResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getProduct(productId)
      setProduct(res.data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [productId])

  const handleUpdate = async (data: ProductRequest) => {
    setError('')
    try {
      await updateProduct(productId, data)
      setEditing(false)
      load()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const handleDelete = async () => {
    if (!confirm('eliminar este producto?')) return
    setError('')
    try {
      await deleteProduct(productId)
      navigate('/products')
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  if (loading) return <div className="container">Cargando...</div>

  if (error && !product)
    return (
      <div className="container">
        <p className="error">{error}</p>
        <button onClick={() => navigate('/products')}>Volver</button>
      </div>
    )

  if (!product) return null

  return (
    <div className="container">
      <button className="secondary" onClick={() => navigate('/products')}>
        Volver
      </button>

      {error && <p className="error">{error}</p>}

      {editing ? (
        <div className="form-box" style={{ margin: '15px 0' }}>
          <h2>Editar producto</h2>
          <ProductForm
            initial={{
              name: product.name,
              description: product.description,
              category: product.category,
              price: product.price,
              stock: product.stock,
              imageUrl: product.imageUrl,
              availability: product.availability,
            }}
            submitLabel="Guardar"
            onSubmit={handleUpdate}
          />
          <button
            className="secondary"
            style={{ marginTop: 10 }}
            onClick={() => setEditing(false)}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="detail-card">
          <h2>{product.name}</h2>
          {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
          <p>{product.description}</p>
          <p>
            <b>Categoria:</b> {product.category}
          </p>
          <p>
            <b>Precio:</b> S/ {product.price}
          </p>
          <p>
            <b>Stock:</b> {product.stock}
          </p>
          <p>
            <b>Estado:</b> {product.availability}
          </p>
          <div className="actions">
            <button onClick={() => setEditing(true)}>Editar</button>
            <button className="danger" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/api'
import { getErrorMessage } from '../utils/errors'
import type { ProductResponse } from '../types/types'

const Products = () => {
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async (p: number) => {
    setLoading(true)
    setError('')
    try {
      const res = await getProducts(p, 10)
      setProducts(res.data.content)
      setTotalPages(res.data.totalPages)
      setPage(res.data.number)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(0)
  }, [])

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Productos</h1>
        <Link to="/products/new">
          <button>Nuevo producto</button>
        </Link>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="info">Cargando...</p>}

      {!loading && products.length === 0 && !error && (
        <p className="info">No hay productos.</p>
      )}

      {products.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>S/ {p.price}</td>
                <td>{p.stock}</td>
                <td>{p.availability}</td>
                <td>
                  <Link to={`/products/${p.id}`}>Ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 0} onClick={() => load(page - 1)}>
            Anterior
          </button>
          <span>
            Pagina {page + 1} de {totalPages}
          </span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => load(page + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default Products
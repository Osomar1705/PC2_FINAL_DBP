import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/products" className="brand">
        TechStore
      </Link>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/products">Productos</Link>
            <button onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
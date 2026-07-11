import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import ProtectRoute from './Components/ProtectRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Products from './pages/Products'
import NewProduct from './pages/NewProduct'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/products"
          element={
            <ProtectRoute>
              <Products />
            </ProtectRoute>
          }
        />
        <Route
          path="/products/new"
          element={
            <ProtectRoute>
              <NewProduct />
            </ProtectRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectRoute>
              <ProductDetail />
            </ProtectRoute>
          }
        />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </>
  )
}

export default App
import { createContext, useContext, useState, type ReactNode } from 'react'
import { login as loginApi, register as registerApi } from '../api/api'
import type { LoginRequest, RegisterRequest } from '../types/types'

interface AuthContextType {
  token: string | null
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  )

  const login = async (data: LoginRequest) => {
    const res = await loginApi(data)
    localStorage.setItem('token', res.data.token)
    setToken(res.data.token)
  }

  const register = async (data: RegisterRequest) => {
    const res = await registerApi(data)
    localStorage.setItem('token', res.data.token)
    setToken(res.data.token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token,login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('se debe usar entro de AuthProvider')
  return ctx
}
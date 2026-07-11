import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import constants from './constants'
import type {
  AuthResponse,
  LoginRequest,
  PageProductResponse,
  ProductRequest,
  ProductResponse,
  RegisterRequest,
} from '../types/types'

const api = axios.create({ baseURL: constants.API_HOST })

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)


export const register = (data: RegisterRequest) =>
  api.post<AuthResponse>('/auth/register', data)

export const login = (data: LoginRequest) =>
  api.post<AuthResponse>('/auth/login', data)

export const getProducts = (page: number, size: number) =>
  api.get<PageProductResponse>('/products', { params: { page, size } })

export const getProduct = (id: number) =>
  api.get<ProductResponse>(`/products/${id}`)

export const createProduct = (data: ProductRequest) =>
  api.post<ProductResponse>('/products', data)

export const updateProduct = (id: number, data: ProductRequest) =>
  api.put<ProductResponse>(`/products/${id}`, data)

export const deleteProduct = (id: number) => api.delete(`/products/${id}`)

export default api
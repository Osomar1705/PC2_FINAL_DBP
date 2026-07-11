export interface RegisterRequest {
  username: string
  email: string
  password: string
  fullName: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
}

export type Availability = 'DISPONIBLE' | 'AGOTADO' | 'PROXIMAMENTE'

export interface ProductRequest {
  name: string
  description: string
  category: string
  price: number
  stock: number
  imageUrl: string
  availability: Availability
}

export interface ProductResponse {
  id: number
  name: string
  description: string
  category: string
  price: number
  stock: number
  imageUrl: string
  availability: Availability
}

export interface PageProductResponse {
  content: ProductResponse[]
  totalPages: number
  totalElements: number
  size: number
  number: number
  first:boolean
  last:boolean
  numberOfElements: number
  empty: boolean
}
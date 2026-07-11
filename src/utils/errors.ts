import axios from 'axios'

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const backendMsg = (error.response?.data as { error?: string })?.error

    switch (status) {
      case 400:
      case 401:
        return backendMsg ?? 'token expirado o invalido'
      case 404:
        return backendMsg ?? 'recurso no existe'
      case 409:
        return backendMsg ?? 'El recurso ya existe (dato duplicado).'
      case 500:
        return 'Error interno del servidor. Intenta mas tarde.'
      default:
        return backendMsg ?? 'Ocurrio un error inesperado.'
    }
  }
  return 'servidor no disponible'
}
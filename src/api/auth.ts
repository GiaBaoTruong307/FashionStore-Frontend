import { apiFetch } from './client'

export type AuthUser = {
  id: number
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

export const registerApi = (name: string, email: string, password: string) => {
  return apiFetch<{ message: string; data: AuthUser }>('/auth/register', {
    method: 'POST',
    body: { name, email, password },
  })
}

export const loginApi = (email: string, password: string) => {
  return apiFetch<{ message: string; data: { id: number; token: string } }>('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
}

export const getMeApi = () => {
  return apiFetch<{ data: AuthUser }>('/auth/me')
}

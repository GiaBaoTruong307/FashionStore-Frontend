import { apiFetch } from './client'
import type { CartItems } from '../types'

export const getCartApi = () => {
  return apiFetch<{ data: CartItems }>('/cart')
}

export const addToCartApi = (itemId: string, size: string) => {
  return apiFetch<{ data: CartItems }>('/cart/add', {
    method: 'POST',
    body: { itemId: Number(itemId), size },
  })
}

export const updateCartApi = (itemId: string, size: string, quantity: number) => {
  return apiFetch<{ data: CartItems }>('/cart/update', {
    method: 'POST',
    body: { itemId: Number(itemId), size, quantity },
  })
}

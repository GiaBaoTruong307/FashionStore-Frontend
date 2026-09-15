import { apiFetch } from './client'

export type OrderAddress = {
  firstName: string
  lastName: string
  email: string
  street: string
  city: string
  state: string
  zipcode: string
  country: string
  phone: string
}

export type OrderItem = {
  productId: number
  name: string
  image: string
  price: number
  size: string
  quantity: number
}

export type Order = {
  id: number
  items: OrderItem[]
  amount: number
  address: OrderAddress
  status: string
  paymentMethod: string
  payment: boolean
  date: number
}

export const placeOrderApi = (address: OrderAddress) => {
  return apiFetch<{ data: Order }>('/orders/place', {
    method: 'POST',
    body: { address },
  })
}

export const placeOrderStripeApi = (address: OrderAddress) => {
  return apiFetch<{ data: { sessionUrl: string } }>('/orders/place-stripe', {
    method: 'POST',
    body: { address },
  })
}

export const verifyStripeApi = (orderId: number, success: boolean) => {
  return apiFetch<{ data: { verified: boolean } }>('/orders/verify-stripe', {
    method: 'POST',
    body: { orderId, success },
  })
}

export const getUserOrdersApi = () => {
  return apiFetch<{ data: Order[] }>('/orders')
}

export const getAllOrdersApi = () => {
  return apiFetch<{ data: Order[] }>('/orders/all')
}

export const updateOrderStatusApi = (orderId: number, status: string) => {
  return apiFetch<{ data: Order }>('/orders/status', {
    method: 'PUT',
    body: { orderId, status },
  })
}

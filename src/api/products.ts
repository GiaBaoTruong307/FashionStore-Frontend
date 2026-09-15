import { apiFetch } from './client'
import type { Product } from '../types'

type ApiProduct = {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  category: string
  subCategory: string
  sizes: string[]
  bestseller: boolean
  date: number
}

const mapProduct = (item: ApiProduct): Product => ({
  id: String(item.id),
  name: item.name,
  description: item.description,
  price: item.price,
  image: item.images,
  category: item.category,
  subCategory: item.subCategory,
  sizes: item.sizes,
  date: item.date,
  bestseller: item.bestseller,
})

export const getProducts = async (query?: {
  category?: string
  subCategory?: string
  search?: string
}): Promise<Product[]> => {
  const params = new URLSearchParams()
  if (query?.category) params.set('category', query.category)
  if (query?.subCategory) params.set('subCategory', query.subCategory)
  if (query?.search) params.set('search', query.search)

  const queryString = params.toString()
  const { data } = await apiFetch<{ data: ApiProduct[] }>(
    `/products${queryString ? `?${queryString}` : ''}`
  )
  return data.map(mapProduct)
}

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await apiFetch<{ data: ApiProduct }>(`/products/${id}`)
  return mapProduct(data)
}

export const createProductApi = (formData: FormData) => {
  return apiFetch<{ message: string; data: ApiProduct }>('/products', {
    method: 'POST',
    body: formData,
  })
}

export const updateProductApi = (id: string, formData: FormData) => {
  return apiFetch<{ message: string; data: ApiProduct }>(`/products/${id}`, {
    method: 'PUT',
    body: formData,
  })
}

export const deleteProductApi = (id: string) => {
  return apiFetch<{ message: string }>(`/products/${id}`, {
    method: 'DELETE',
  })
}

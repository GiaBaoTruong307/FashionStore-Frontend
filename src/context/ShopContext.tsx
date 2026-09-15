import { createContext, useState, useEffect, useMemo, type ReactNode } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import type { CartItems, Product, ShopContextType } from '../types'
import { getProducts } from '../api/products'
import { getCartApi, addToCartApi, updateCartApi } from '../api/cart'
import { getMeApi, type AuthUser } from '../api/auth'
import { decodeToken } from '../utils/decodeToken'

export const ShopContext = createContext<ShopContextType | null>(null)

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const currency = '$'
  const delivery_fee = 10

  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState<CartItems>({})
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<AuthUser | null>(null)

  const navigate = useNavigate()

  const role = useMemo(() => {
    if (!token) return null
    return decodeToken(token)?.role ?? null
  }, [token])

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => toast.error('Không tải được danh sách sản phẩm.'))
  }, [])

  useEffect(() => {
    if (!token) {
      setCartItems({})
      setUser(null)
      return
    }

    getCartApi()
      .then(({ data }) => setCartItems(data))
      .catch(() => toast.error('Không tải được giỏ hàng.'))

    getMeApi()
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
  }, [token])

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setCartItems({})
    setUser(null)
    navigate('/login')
  }

  const addToCart = (itemId: string, size: string) => {
    if (!size) return toast.error('Please select a size before adding to cart.')

    if (!token) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng.')
      navigate('/login')
      return
    }

    setCartItems((prev) => {
      const newCart = structuredClone(prev)
      newCart[itemId] = newCart[itemId] || {}
      newCart[itemId][size] = (newCart[itemId][size] || 0) + 1
      return newCart
    })

    addToCartApi(itemId, size)
      .then(() => toast.success('Added to cart!'))
      .catch(() => toast.error('Thêm vào giỏ hàng thất bại.'))
  }

  const updateQuantity = (itemId: string, size: string, quantity: number) => {
    setCartItems((prev) => {
      const newCart = structuredClone(prev)
      newCart[itemId] = newCart[itemId] || {}
      newCart[itemId][size] = quantity
      return newCart
    })

    if (!token) return

    updateCartApi(itemId, size, quantity).catch(() => toast.error('Cập nhật giỏ hàng thất bại.'))
  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product.id === items)
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += (itemInfo?.price || 0) * cartItems[items][item]
        }
      }
    }
    return totalAmount
  }

  const getCartCount = useMemo(() => {
    let total = 0
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size]
      }
    }
    return total
  }, [cartItems])

  const value: ShopContextType = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    token,
    role,
    user,
    login,
    logout,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

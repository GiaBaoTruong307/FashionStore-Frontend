import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useShopContext } from '../../hooks/useShopContext'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useShopContext()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute

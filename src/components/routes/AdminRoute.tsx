import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useShopContext } from '../../hooks/useShopContext'

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { token, role } = useShopContext()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute

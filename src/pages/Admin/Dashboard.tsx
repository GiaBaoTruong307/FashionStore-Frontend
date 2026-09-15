import { useEffect, useState } from 'react'
import { getProducts } from '../../api/products'
import { getAllOrdersApi, type Order } from '../../api/orders'

const AdminDashboard = () => {
  const [productCount, setProductCount] = useState(0)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getProducts(), getAllOrdersApi()])
      .then(([products, ordersRes]) => {
        setProductCount(products.length)
        setOrders(ordersRes.data)
      })
      .finally(() => setLoading(false))
  }, [])

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      {loading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded border bg-white p-5">
            <p className="text-sm text-gray-500">Tổng sản phẩm</p>
            <p className="mt-1 text-3xl font-semibold">{productCount}</p>
          </div>
          <div className="rounded border bg-white p-5">
            <p className="text-sm text-gray-500">Tổng đơn hàng</p>
            <p className="mt-1 text-3xl font-semibold">{orders.length}</p>
          </div>
          <div className="rounded border bg-white p-5">
            <p className="text-sm text-gray-500">Tổng doanh thu</p>
            <p className="mt-1 text-3xl font-semibold">${totalRevenue}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard

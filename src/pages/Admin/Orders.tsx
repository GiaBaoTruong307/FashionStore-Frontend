import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllOrdersApi, updateOrderStatusApi, type Order } from '../../api/orders'

const STATUSES = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered']

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllOrdersApi()
      .then(({ data }) => setOrders(data))
      .catch(() => toast.error('Không tải được danh sách đơn hàng.'))
      .finally(() => setLoading(false))
  }, [])

  const onStatusChange = async (orderId: number, status: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))

    try {
      await updateOrderStatusApi(orderId, status)
      toast.success('Đã cập nhật trạng thái.')
    } catch {
      toast.error('Cập nhật thất bại.')
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Đơn hàng</h1>

      {loading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded border bg-white p-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="text-sm">
                  <p className="font-medium">
                    {order.address.firstName} {order.address.lastName} — {order.address.phone}
                  </p>
                  <p className="text-gray-500">
                    {order.address.street}, {order.address.city}, {order.address.state}{' '}
                    {order.address.zipcode}, {order.address.country}
                  </p>
                  <p className="mt-2 text-gray-500">
                    {new Date(order.date).toLocaleString()} · {order.paymentMethod} ·{' '}
                    {order.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => onStatusChange(order.id, e.target.value)}
                  className="rounded border px-3 py-2 text-sm"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 flex flex-col gap-2 border-t pt-4 text-sm">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <p>
                      {item.name} · size {item.size} · x{item.quantity}
                    </p>
                    <p>${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-right font-medium">Tổng: ${order.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminOrders

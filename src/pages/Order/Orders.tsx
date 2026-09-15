import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Title from '../../components/ui/Title'
import { useShopContext } from '../../hooks/useShopContext'
import { getUserOrdersApi, type Order } from '../../api/orders'

const Orders = () => {
  const { currency } = useShopContext()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserOrdersApi()
      .then(({ data }) => setOrders(data))
      .catch(() => toast.error('Không tải được danh sách đơn hàng.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDER" />
      </div>

      {loading ? (
        <p className="py-10 text-center text-gray-500">Đang tải...</p>
      ) : orders.length === 0 ? (
        <p className="py-10 text-center text-gray-500">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div>
          {orders.map((order) =>
            order.items.map((item, index) => (
              <div
                key={`${order.id}-${index}`}
                className="flex flex-col gap-4 border-y py-4 text-gray-700 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-6 text-sm">
                  <img className="w-16 sm:w-20" src={item.image} alt={item.name} />
                  <div>
                    <p className="font-medium sm:text-base">{item.name}</p>
                    <div className="mt-2 flex items-center gap-3 text-base text-gray-700">
                      <p className="text-lg">
                        {currency}
                        {item.price}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className="mt-2">
                      Date:{' '}
                      <span className="text-gray-400">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between md:w-1/2">
                  <div className="flex items-center gap-2">
                    <p className="h-2 min-w-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{order.status}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Orders

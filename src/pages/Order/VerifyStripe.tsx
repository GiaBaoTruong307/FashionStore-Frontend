import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { verifyStripeApi } from '../../api/orders'
import { useShopContext } from '../../hooks/useShopContext'

const VerifyStripe = () => {
  const [searchParams] = useSearchParams()
  const { navigate } = useShopContext()

  useEffect(() => {
    const orderId = Number(searchParams.get('orderId'))
    const success = searchParams.get('success') === 'true'

    if (!orderId) {
      navigate('/cart')
      return
    }

    verifyStripeApi(orderId, success)
      .then(({ data }) => {
        if (data.verified) {
          toast.success('Thanh toán thành công!')
          navigate('/orders')
        } else {
          toast.error('Thanh toán đã bị huỷ.')
          navigate('/cart')
        }
      })
      .catch(() => {
        toast.error('Không xác minh được đơn hàng.')
        navigate('/cart')
      })
  }, [])

  return <p className="py-20 text-center text-gray-500">Đang xác minh thanh toán...</p>
}

export default VerifyStripe

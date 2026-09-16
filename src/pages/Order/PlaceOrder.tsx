import { useState } from 'react'
import { toast } from 'react-toastify'
import Title from '../../components/ui/Title'
import { assets } from '../../constants/assets'
import CartTotal from '../Cart/components/CartTotal'
import { useShopContext } from '../../hooks/useShopContext'
import { placeOrderApi, placeOrderStripeApi } from '../../api/orders'
import { ApiError } from '../../api/client'

const initialAddress = {
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  phone: '',
}

const PlaceOrder = () => {
  const [method, setMethod] = useState<'stripe' | 'razorpay' | 'cod'>('cod')
  const [address, setAddress] = useState(initialAddress)
  const [loading, setLoading] = useState(false)

  const { navigate, getCartCount } = useShopContext()

  const onChange = (field: keyof typeof initialAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (getCartCount === 0) {
      toast.error('Giỏ hàng đang trống.')
      return
    }

    if (method === 'razorpay') {
      toast.error(
        'Phương thức thanh toán này chưa hỗ trợ, vui lòng chọn Stripe hoặc Cash on Delivery.'
      )
      return
    }

    setLoading(true)
    try {
      if (method === 'stripe') {
        const { data } = await placeOrderStripeApi(address)
        window.location.href = data.sessionUrl
        return
      }

      await placeOrderApi(address)
      toast.success('Đặt hàng thành công!')
      navigate('/orders')
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Đặt hàng thất bại.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="min-h-[[80vh] flex flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-14"
    >
      <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={address.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            placeholder="First name"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            required
          />
          <input
            type="text"
            value={address.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            placeholder="Last name"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            required
          />
        </div>
        <input
          type="email"
          value={address.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="Email"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          required
        />
        <input
          type="text"
          value={address.street}
          onChange={(e) => onChange('street', e.target.value)}
          placeholder="Street"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            value={address.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="City"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            required
          />
          <input
            type="text"
            value={address.state}
            onChange={(e) => onChange('state', e.target.value)}
            placeholder="State"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={address.zipcode}
            onChange={(e) => onChange('zipcode', e.target.value)}
            placeholder="Zipcode"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            required
          />
          <input
            type="text"
            value={address.country}
            onChange={(e) => onChange('country', e.target.value)}
            placeholder="Country"
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            required
          />
        </div>
        <input
          type="tel"
          value={address.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="Phone"
          className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          required
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              onClick={() => setMethod('stripe')}
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === 'stripe' ? 'bg-green-400' : ''}`}
              ></p>
              <img className="mx-4 h-5" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod('razorpay')}
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === 'razorpay' ? 'bg-green-400' : ''}`}
              ></p>
              <img className="mx-4 h-5" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod('cod')}
              className="flex cursor-pointer items-center gap-3 border p-2 px-3"
            >
              <p
                className={`h-3.5 min-w-3.5 rounded-full border ${method === 'cod' ? 'bg-green-400' : ''}`}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="mt-8 w-full text-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-black px-16 py-3 text-sm text-white disabled:opacity-50"
            >
              {loading ? 'PLACING...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

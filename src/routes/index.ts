import Layout from '../components/layouts/Layout'
import AdminLayout from '../components/layouts/AdminLayout'
import Home from '../pages/Home/Home'
import Collection from '../pages/Collection/Collection'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import Product from '../pages/ProductDetail/ProductDetail'
import Cart from '../pages/Cart/Cart'
import Login from '../pages/Account/Login'
import Profile from '../pages/Account/Profile'
import PlaceOrder from '../pages/Order/PlaceOrder'
import Orders from '../pages/Order/Orders'
import VerifyStripe from '../pages/Order/VerifyStripe'
import NotFound from '../pages/NotFound/NotFound'
import AdminDashboard from '../pages/Admin/Dashboard'
import AdminProducts from '../pages/Admin/Products'
import AdminProductForm from '../pages/Admin/ProductForm'
import AdminOrders from '../pages/Admin/Orders'

export const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', element: Home, index: true, label: 'Trang chủ' },
      { path: '/collection', element: Collection, label: 'Bộ sưu tập' },
      { path: '/about', element: About, label: 'Giới thiệu' },
      { path: '/contact', element: Contact, label: 'Liên hệ' },
      { path: '/product/:id', element: Product, label: 'Chi tiết sản phẩm', hidden: true },
      { path: '/cart', element: Cart, label: 'Giỏ hàng' },
      { path: '/place-order', element: PlaceOrder, label: 'Thanh toán', private: true },
      { path: '/orders', element: Orders, label: 'Đơn hàng', private: true },
      { path: '/profile', element: Profile, label: 'Tài khoản', private: true },
      {
        path: '/verify-stripe',
        element: VerifyStripe,
        label: 'Xác minh thanh toán',
        hidden: true,
        private: true,
      },
      { path: '*', element: NotFound, hidden: true },
      {
        path: '/login',
        element: Login,
        label: 'Đăng nhập',
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    guard: 'admin',
    children: [
      { path: '', element: AdminDashboard, index: true, label: 'Dashboard' },
      { path: 'products', element: AdminProducts, label: 'Sản phẩm' },
      {
        path: 'products/new',
        element: AdminProductForm,
        label: 'Thêm sản phẩm',
        hidden: true,
      },
      {
        path: 'products/:id/edit',
        element: AdminProductForm,
        label: 'Sửa sản phẩm',
        hidden: true,
      },
      { path: 'orders', element: AdminOrders, label: 'Đơn hàng' },
    ],
  },
]

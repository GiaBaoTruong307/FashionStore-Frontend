import { Link, Outlet, useLocation } from 'react-router-dom'
import { useShopContext } from '../../hooks/useShopContext'

const navItems = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/products', label: 'Sản phẩm' },
  { to: '/admin/orders', label: 'Đơn hàng' },
]

const AdminLayout = () => {
  const { logout } = useShopContext()
  const location = useLocation()

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r bg-gray-900 text-white">
        <div className="border-b border-gray-700 px-6 py-5 text-lg font-semibold">Admin Panel</div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded px-3 py-2 text-sm ${
                location.pathname === item.to ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3">
          <button
            onClick={logout}
            className="w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-800"
          >
            Đăng xuất
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout

import { useState } from 'react'
import { assets } from '../../constants/assets'
import { Link, useLocation } from 'react-router-dom'
import { useShopContext } from '../../hooks/useShopContext'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  const { setShowSearch, getCartCount, token, role, logout, navigate } = useShopContext()

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center justify-between py-5 font-medium"
    >
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 ${isActive('/') ? 'active' : ''}`}
        >
          <p>HOME</p>
          <hr className="underline-bar h-[1.5px] w-2/4 border-none bg-gray-700" />
        </Link>

        <Link
          to="/collection"
          className={`flex flex-col items-center gap-1 ${isActive('/collection') ? 'active' : ''}`}
        >
          <p>COLLECTION</p>
          <hr className="underline-bar h-[1.5px] w-2/4 border-none bg-gray-700" />
        </Link>

        <Link
          to="/about"
          className={`flex flex-col items-center gap-1 ${isActive('/about') ? 'active' : ''}`}
        >
          <p>ABOUT</p>
          <hr className="underline-bar h-[1.5px] w-2/4 border-none bg-gray-700" />
        </Link>

        <Link
          to="/contact"
          className={`flex flex-col items-center gap-1 ${isActive('/contact') ? 'active' : ''}`}
        >
          <p>CONTACT</p>
          <hr className="underline-bar h-[1.5px] w-2/4 border-none bg-gray-700" />
        </Link>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <img
            onClick={() => !token && navigate('/login')}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          {token && (
            <div className="absolute right-0 hidden pt-4 group-hover:block">
              <div className="flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500">
                {role === 'ADMIN' && (
                  <p onClick={() => navigate('/admin')} className="cursor-pointer hover:text-black">
                    Admin Panel
                  </p>
                )}
                <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-black">
                  My Profile
                </p>
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  LogOut
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute bottom-[-5px] right-[-5px] aspect-square w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white">
            {getCartCount}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      <div
        className={`absolute inset-y-0 right-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex cursor-pointer items-center gap-4 p-3"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>

          <Link onClick={() => setVisible(false)} className="border py-2 pl-6" to="/">
            HOME
          </Link>

          <Link onClick={() => setVisible(false)} className="border py-2 pl-6" to="/collection">
            COLLECTION
          </Link>

          <Link onClick={() => setVisible(false)} className="border py-2 pl-6" to="/about">
            ABOUT
          </Link>

          <Link onClick={() => setVisible(false)} className="border py-2 pl-6" to="/contact">
            CONTACT
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar

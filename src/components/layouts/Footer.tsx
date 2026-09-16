import { Link } from 'react-router-dom'
import { assets } from '../../constants/assets'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="my-10 mt-40 flex grid-cols-[3fr_1fr_1fr] flex-col gap-14 text-sm sm:grid">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full text-gray-600 md:w-2/3">
            Forever is your go-to destination for modern, high-quality fashion. We bring timeless
            style, exceptional craftsmanship, and the latest trends straight to your wardrobe — all
            with effortless shopping and outstanding service.
          </p>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/place-order">
              <li>Delivery</li>
            </Link>
            <Link to="#">
              <li>Privacy policy</li>
            </Link>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+84-905-442-322</li>
            <li>giabaotruong30704@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-center text-sm">
          Copyright 2026@ GiaBaoTruong - All Right Reserved
        </p>
      </div>
    </motion.div>
  )
}

export default Footer

import { Link } from 'react-router-dom'
import { useShopContext } from '../../hooks/useShopContext'
import { motion } from 'framer-motion'

interface Props {
  id: string
  image: string[]
  name: string
  price: number
}

const ProductItem = ({ id, image, name, price }: Props) => {
  const { currency } = useShopContext()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Link className="cursor-pointer text-gray-700" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img className="transition ease-in-out hover:scale-110" src={image[0]} alt="" />
        </div>
        <p className="pb-1 pt-3 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </motion.div>
  )
}

export default ProductItem

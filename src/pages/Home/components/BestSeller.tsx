import { useEffect, useState } from 'react'
import { useShopContext } from '../../../hooks/useShopContext'
import type { Product } from '../../../types'
import { motion } from 'framer-motion'

import Title from '../../../components/ui/Title'
import ProductItem from '../../../components/products/ProductItem'

const BestSeller = () => {
  const { products } = useShopContext()
  const [bestSeller, setBestSeller] = useState<Product[]>([])

  useEffect(() => {
    const bestProduct = products.filter((item: Product) => item.bestseller)
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="my-10"
    >
      <div className="py-8 text-center text-3xl">
        <Title text1="BEST" text2="SELLER" />
        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          Loved by thousands of customers worldwide. These are the pieces everyone is adding to
          their cart right now — timeless styles, perfect fits, and unbeatable quality that keep
          coming back season after season.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default BestSeller

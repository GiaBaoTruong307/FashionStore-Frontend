import { useEffect, useState } from 'react'
import Title from '../../../components/ui/Title'
import ProductItem from '../../../components/products/ProductItem'
import type { Product } from '../../../types'
import { useShopContext } from '../../../hooks/useShopContext'
import { motion } from 'framer-motion'

const LatestCollection = () => {
  const { products } = useShopContext()
  const [latestProducts, setLatestProducts] = useState<Product[]>([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="my-10"
    >
      <div className="py-8 text-center text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          Discover the newest arrivals handpicked just for you. From timeless classics to the
          hottest trends of the season — elevate your wardrobe with pieces designed to make you look
          and feel extraordinary.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default LatestCollection

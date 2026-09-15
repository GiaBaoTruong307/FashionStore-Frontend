import { useEffect, useState } from 'react'
import Title from '../../../components/ui/Title'
import ProductItem from '../../../components/products/ProductItem'
import { type Product } from '../../../types'
import { useShopContext } from '../../../hooks/useShopContext'

interface Props {
  id: string
  category: string
  subCategory: string
}

const RelatedProducts = ({ id, category, subCategory }: Props) => {
  const { products } = useShopContext()
  const [related, setRelated] = useState<Product[]>([])

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()

      productsCopy = productsCopy.filter(
        (item) => item.id !== id && item.category === category && item.subCategory === subCategory
      )
      setRelated(productsCopy)
    }
  }, [products, id, category, subCategory])

  return (
    <div className="my-24">
      <div className="py-2 text-center text-3xl">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {related.slice(0, 5).map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts

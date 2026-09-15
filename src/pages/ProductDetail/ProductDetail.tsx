import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../../constants/assets'
import RelatedProducts from './components/RelatedProducts'
import { useShopContext } from '../../hooks/useShopContext'
import { type Product as ProductType } from '../../types'

const Product = () => {
  const { id } = useParams<{ id: string }>()
  const { products, currency, addToCart } = useShopContext()
  const [productData, setProductData] = useState<ProductType | null>(null)
  const [image, setImage] = useState<string>('')
  const [size, setSize] = useState<string>('')

  const fetchProductData = async () => {
    products.map((item) => {
      {
        if (item.id === id) {
          setProductData(item)
          setImage(item.image[0])
        }
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [id, products])

  return productData ? (
    <div className="border-t-2 pt-10 opacity-100 transition-opacity duration-500 ease-in">
      {/* Product Data */}
      <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">
        {/* Product Images */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex w-full justify-between overflow-x-auto sm:w-[18.7%] sm:flex-col sm:justify-normal sm:overflow-y-scroll">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                className="w-[24%] shrink-0 cursor-pointer sm:mb-3 sm:w-full"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-4/5">
            <img className="h-auto w-full" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
          <div className="mt-2 flex items-center gap-1">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="my-8 flex flex-col gap-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border bg-gray-100 px-4 py-2 ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData.id, size)}
            className="bg-black px-8 py-3 text-sm text-white active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="mt-5 flex flex-col gap-1 text-sm text-gray-500">
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy returns and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
          <p>
            This product is crafted with premium materials to ensure long-lasting durability and
            comfort. Designed with a modern aesthetic, it fits effortlessly into any lifestyle and
            can be used daily without compromising quality. Whether you're heading out or staying
            in, this item is made to provide both style and practicality.
          </p>
          <p>
            Each piece goes through a detailed quality-check process to meet high manufacturing
            standards. We focus on both functionality and appearance, offering you a product that
            not only looks great but also performs reliably. Customer satisfaction is our priority,
            and we aim to bring you a smooth, enjoyable experience every time you use it.
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts
        id={productData.id}
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  )
}

export default Product

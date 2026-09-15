import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductById, createProductApi, updateProductApi } from '../../api/products'
import { ApiError } from '../../api/client'

const CATEGORIES = ['Men', 'Women', 'Kids']
const SUBCATEGORIES = ['Topwear', 'Bottomwear', 'Winterwear']
const ALL_SIZES = ['S', 'M', 'L', 'XL', 'XXL']

const AdminProductForm = () => {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [subCategory, setSubCategory] = useState(SUBCATEGORIES[0])
  const [sizes, setSizes] = useState<string[]>([])
  const [bestseller, setBestseller] = useState(false)
  const [images, setImages] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(isEdit)

  useEffect(() => {
    if (!id) return

    getProductById(id)
      .then((product) => {
        setName(product.name)
        setDescription(product.description)
        setPrice(String(product.price))
        setCategory(product.category)
        setSubCategory(product.subCategory)
        setSizes(product.sizes)
        setBestseller(product.bestseller)
      })
      .catch(() => toast.error('Không tải được sản phẩm.'))
      .finally(() => setLoadingProduct(false))
  }, [id])

  const toggleSize = (size: string) => {
    setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (sizes.length === 0) {
      toast.error('Chọn ít nhất 1 size.')
      return
    }

    if (!isEdit && (!images || images.length === 0)) {
      toast.error('Chọn ít nhất 1 ảnh sản phẩm.')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('subCategory', subCategory)
    formData.append('sizes', JSON.stringify(sizes))
    formData.append('bestseller', String(bestseller))

    if (images) {
      Array.from(images).forEach((file) => formData.append('images', file))
    }

    setLoading(true)
    try {
      if (isEdit && id) {
        await updateProductApi(id, formData)
        toast.success('Cập nhật sản phẩm thành công.')
      } else {
        await createProductApi(formData)
        toast.success('Thêm sản phẩm thành công.')
      }
      navigate('/admin/products')
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Có lỗi xảy ra.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (loadingProduct) return <p className="text-gray-500">Đang tải...</p>

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">{isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h1>

      <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Tên sản phẩm</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border px-3 py-2"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
            min={0}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">Danh mục</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded border px-3 py-2"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">Loại</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full rounded border px-3 py-2"
            >
              {SUBCATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Size</label>
          <div className="flex flex-wrap gap-2">
            {ALL_SIZES.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`rounded border px-3 py-1 text-sm ${
                  sizes.includes(size) ? 'border-black bg-black text-white' : 'border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
          />
          Bestseller
        </label>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Ảnh sản phẩm {isEdit && '(bỏ trống nếu giữ ảnh cũ)'}
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="w-full text-sm"
          />
        </div>

        <button
          disabled={loading}
          className="mt-2 rounded bg-black px-6 py-2 text-sm text-white disabled:opacity-50"
        >
          {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Thêm sản phẩm'}
        </button>
      </form>
    </div>
  )
}

export default AdminProductForm

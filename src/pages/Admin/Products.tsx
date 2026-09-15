import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProducts, deleteProductApi } from '../../api/products'
import type { Product } from '../../types'

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const loadProducts = () => {
    setLoading(true)
    getProducts()
      .then(setProducts)
      .catch(() => toast.error('Không tải được danh sách sản phẩm.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const onDelete = async (id: string) => {
    if (!confirm('Xoá sản phẩm này?')) return

    try {
      await deleteProductApi(id)
      toast.success('Đã xoá sản phẩm.')
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch {
      toast.error('Xoá thất bại.')
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>
        <Link to="/admin/products/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          + Thêm sản phẩm
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : (
        <div className="overflow-x-auto rounded border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3">Ảnh</th>
                <th className="px-4 py-3">Tên</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <img src={product.image[0]} className="size-12 object-cover" alt="" />
                  </td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">
                    {product.category} / {product.subCategory}
                  </td>
                  <td className="px-4 py-3">${product.price}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="mr-3 text-blue-600 hover:underline"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminProducts

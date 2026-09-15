import Title from '../../components/ui/Title'
import { useShopContext } from '../../hooks/useShopContext'

const Profile = () => {
  const { user } = useShopContext()

  return (
    <div className="border-t pt-14">
      <div className="mb-6 text-2xl">
        <Title text1="MY" text2="PROFILE" />
      </div>

      {!user ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : (
        <div className="flex max-w-md flex-col gap-4 text-sm text-gray-700">
          <div>
            <p className="text-gray-400">Họ tên</p>
            <p className="mt-1 text-base">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p className="mt-1 text-base">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Vai trò</p>
            <p className="mt-1 text-base">
              {user.role === 'ADMIN' ? 'Quản trị viên' : 'Khách hàng'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile

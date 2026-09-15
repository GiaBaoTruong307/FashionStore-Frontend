import { useState } from 'react'
import { toast } from 'react-toastify'
import { useShopContext } from '../../hooks/useShopContext'
import { loginApi, registerApi } from '../../api/auth'
import { ApiError } from '../../api/client'

const Login = () => {
  const [currentState, setCurrentState] = useState<'Login' | 'Sign Up'>('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, navigate } = useShopContext()

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (currentState === 'Sign Up') {
        await registerApi(name, email, password)
        toast.success('Đăng ký thành công, mời đăng nhập.')
        setCurrentState('Login')
        setPassword('')
        return
      }

      const { data } = await loginApi(email, password)
      login(data.token)
      toast.success('Đăng nhập thành công!')
      navigate('/')
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Đã có lỗi xảy ra.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="m-auto mt-14 flex w-[90%] flex-col items-center gap-4 text-gray-800 sm:max-w-96"
    >
      <div className="mb-2 mt-10 inline-flex items-center gap-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
      </div>
      {currentState === 'Login' ? (
        ''
      ) : (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-800 px-3 py-2"
          placeholder="Name"
          required
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-800 px-3 py-2"
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-800 px-3 py-2"
        placeholder="Password"
        required
        minLength={8}
      />
      <div className="mt-[-8px] flex w-full justify-between text-sm">
        <p className="cursor-pointer">Forgot your password</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>
      <button
        disabled={loading}
        className="mt-4 bg-black px-8 py-2 font-light text-white disabled:opacity-50"
      >
        {loading ? 'Please wait...' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login

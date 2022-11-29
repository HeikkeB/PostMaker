import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { checkAuth, loginUser } from '../redux/features/auth/authSlice'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const status = useSelector((state) => state.auth.status)
  const isAuth = useSelector(checkAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {register, 
    formState: {
errors, isValid
  },
  handleSubmit, 
  reset
} = useForm({
  mode: 'onBlur'
})

  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) {
      navigate('/')
      toast.success(`You're logged in`)
    }
  }, [status, isAuth, navigate])

  const handleSubmitLog = () => {
    try {
      dispatch(loginUser({ username, password }))
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-white text-lg text-center">Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="text-xs text-gray-400 ml-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mt-1 mb-3 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          ></input>
        </label>
        <label className="text-xs text-gray-400 ml-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="off"
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          ></input>
        </label>
        <div className="flex flex-col gap-8 justify-center items-center mt-4">
          <button
            type="submit"
            onClick={handleSubmitLog}
            className="flex justify-center items-center text-xs text-white rounded-sm py-w bg-gray-600 w-[100px] py-2 px-1"
          >
            LOGIN
          </button>
          <Link
            to="/register"
            className="flex justify-center items-center text-xs text-white "
          >
            Don't have an account?
          </Link>
        </div>
      </form>
    </div>
  )
}

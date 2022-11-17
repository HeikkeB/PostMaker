import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Routes, Route } from 'react-router-dom'
import { checkAuth, logOut } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export default function NavBar() {
  const isAuth = useSelector(checkAuth)

  const dispatch = useDispatch()

  const logOutHandler = () => {
    dispatch(logOut())
    window.localStorage.removeItem('token')
    toast.error(`You're logged out`)
  }

  return (
    <nav className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-[100px] h-6 bg-gray-600 text-xs text-white rounded-sm">
        POSTMAKER
      </span>
      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink to="/" className="text-xs text-gray-400 hover:text-white">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className="text-xs text-gray-400 hover:text-white"
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className="text-xs text-gray-400 hover:text-white"
            >
              Add Post
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center w-[100px]  text-xs text-white rounded-sm bg-gray-600 px-4 py-1">
        <Routes>
          <Route
            path="*"
            element={
              <Link onClick={logOutHandler} to="/login">
                Sign-out
              </Link>
            }
          />
          <Route path="/login" element={<Link to="/register">Sign-up</Link>} />
          <Route path="/register" element={<Link to="/login">Sign-in</Link>} />
        </Routes>
      </div>
    </nav>
  )
}

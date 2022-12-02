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
    <nav className={isAuth ? "px-10 flex py-4 justify-between items-center" : "px-10 flex py-4 justify-end items-center"}>
    
      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink to="/" className="navLink">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className="navLink"
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className="navLink"
            >
              Add Post
            </NavLink>
          </li>
        </ul>
      )}

      <div className="btnPage">
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

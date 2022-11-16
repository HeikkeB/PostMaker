import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-white text-lg text-center">Registration</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="text-xs text-gray-400 ml-2">
          Username:{' '}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mt-1 mb-3 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          ></input>
        </label>
        <label className="text-xs text-gray-400 ml-2">
          Password:{' '}
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
            onClick={handleSubmit}
            className="flex justify-center items-center text-xs text-white rounded-sm py-w bg-gray-600 w-16 py-1"
          >
            confirm
          </button>
          <Link
            to="/login"
            className="flex justify-center items-center text-xs text-white "
          >
            Have an account?
          </Link>
        </div>
      </form>
    </div>
  )
}

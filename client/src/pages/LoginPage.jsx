import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-white text-lg text-center">Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="text-xs text-gray-400 ml-2">
          Username:{' '}
          <input
            type="text"
            placeholder="Username"
            className="mt-1 mb-3 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          ></input>
        </label>
        <label className="text-xs text-gray-400 ml-2">
          Password:{' '}
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          ></input>
        </label>
        <div className="flex flex-col gap-8 justify-center items-center mt-4">
          <button
            type="submit"
            className="flex justify-center items-center text-xs text-white rounded-sm py-w bg-gray-600 w-16 py-1"
          >
            login
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

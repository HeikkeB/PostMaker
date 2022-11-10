import NavBar from './NavBar'
import React from 'react'

export default function Layout({ children }) {
  return (
    <>
      <div className="container mx-auto">
        <NavBar />
        {children}
      </div>
    </>
  )
}

import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <header className='w-full flex items-center justify-center bg-blue-500'>
        <h1 className='text-center my-5 text-white'>Transactions</h1>
      </header>
      <div className='layout flex-grow bg-gray-100'>
        <Outlet />
      </div>
      <footer className='text-center shadow-lg bg-blue-500 text-white'>
        <p className='my-5'>&copy; 2024 Abdelrahman Essmat Transactions App By <Link className='text-red-300 font-bold' to="https://www.linkedin.com/in/abdelrahman-essmat/">Abdelrahman Essmat</Link></p>
      </footer>
    </div>
  )
}

export default Layout

import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import Layout from './components/Layout/Layout'
import CustomerChart from './components/CustomerChart/CustomerChart'

function App() {
  let routers = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: ':id', element: <CustomerChart /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ])

  return <RouterProvider router={routers}></RouterProvider>
}

export default App

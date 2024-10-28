import React, { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const Navbar = lazy(() => import('userAuthenticationApp/Navbar'))

const Layout = () => {
  return (
    <Suspense>
      <Navbar />
      <Outlet />
    </Suspense>
  )
}

export default Layout

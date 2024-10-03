import React from 'react'
import SideBar from './SideBar'
import HeaderTop from './HeaderTop'

const Layout = ({children}) => {
  return (
    <div className="flex h-screen">
    <SideBar />
    <div className="flex-1 p-4">
      <HeaderTop />
      <main className="flex-1">{children}</main>
    </div>
  </div>
  )
}

export default Layout

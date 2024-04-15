import React from 'react'

import Navbar from 'components/Navbar'
import './index.scss'

interface LayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="main-content">{children}</div>
    </div>
  )
}

export default MainLayout

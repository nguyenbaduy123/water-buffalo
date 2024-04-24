import React, { useEffect } from 'react'

import Navbar from 'components/Navbar'
import './index.scss'

interface LayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="main-content">{children}</div>
    </div>
  )
}

export default MainLayout

import React from 'react'

import Navbar from 'components/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default MainLayout

import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  currentPath: string
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      MainLayout
      {children}
    </div>
  )
}

export default MainLayout

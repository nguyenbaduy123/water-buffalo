import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: LayoutProps) => {
  return <main>{children}</main>
}

export default RootLayout

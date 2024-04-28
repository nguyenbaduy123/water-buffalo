import React, { useEffect } from 'react'

import Navbar from 'components/Navbar'
import './index.scss'
import { useAppDispatch } from 'hooks'
import { connectSocket } from 'actions/auth'

interface LayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(connectSocket())
  }, [])

  return (
    <div className="main-layout">
      <Navbar />
      <div className="main-content">{children}</div>
    </div>
  )
}

export default MainLayout

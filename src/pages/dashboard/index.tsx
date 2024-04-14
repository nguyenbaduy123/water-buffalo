import WithAuth from 'hocs/WithAuth'
import { useAppDispatch } from 'hooks'
import { NextPage } from 'next'
import React from 'react'
import { store } from 'store'
import { AuthState } from 'reducers/types'

interface Props {
  auth: AuthState
}

const Dashboard: NextPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default WithAuth(store)(Dashboard)

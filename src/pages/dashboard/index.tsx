import withAuth from 'hocs/withAuth'
import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'

import { AuthState } from 'reducers/types'
import { AppDispatch, RootState } from 'store'
import MainLayout from 'layouts/MainLayout'

interface Props {
  auth: AuthState
  dispatch: AppDispatch
}

const Dashboard: NextPage<Props> = (props: Props) => {
  return (
    <MainLayout>
      <div>
        <h1>Dashboard</h1>
      </div>
    </MainLayout>
  )
}

const mapStateToProps = (state: RootState) => ({ auth: state.auth })

export default connect(mapStateToProps)(withAuth(Dashboard))

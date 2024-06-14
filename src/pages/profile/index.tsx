import withAuth from 'hocs/withAuth'
import { NextPage } from 'next'
import React from 'react'
import { AuthState } from 'reducers/types'
import { connectAndMapStateToProps } from 'utils/redux'

interface Props {
  auth: AuthState
}

const ProfilePage: NextPage<Props> = ({ auth }) => {
  return (
    <div className="statistics-layout">
      <div className="project-statistics-container">123</div>
    </div>
  )
}

export default connectAndMapStateToProps(['auth'])(withAuth(ProfilePage))

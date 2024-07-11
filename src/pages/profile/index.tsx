import { Flex } from 'antd'
import CurrentUserAvatar from 'common/CurrentUserAvatar'
import withAuth from 'hocs/withAuth'
import AuthLayout from 'layouts/AuthLayout'
import { NextPage } from 'next'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { AuthState } from 'reducers/types'
import { connectAndMapStateToProps } from 'utils/redux'

interface Props {
  auth: AuthState
}

const ProfilePage: NextPage<Props> = ({ auth }) => {
  return (
    <AuthLayout>
      <div className="statistics-layout">
        <div className="project-statistics-container">
          <Flex vertical gap={16}>
            <Flex align="center" gap={16}>
              <CurrentUserAvatar size={62} />
              <h1>{auth.name}</h1>
            </Flex>
            <Flex>Username: {auth.username}</Flex>
            <Flex>Email: {auth.email}</Flex>
            <Flex align="center" gap={8}>
              Country:{' '}
              <ReactCountryFlag
                countryCode={auth.country || 'VN'}
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                }}
              />
            </Flex>
          </Flex>
        </div>
      </div>
    </AuthLayout>
  )
}

export default connectAndMapStateToProps(['auth'])(withAuth(ProfilePage))

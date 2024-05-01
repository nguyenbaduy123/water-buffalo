import { Flex } from 'antd'
import React from 'react'
import { ProviderFC } from 'types/global'

const AuthLayout: ProviderFC = ({ children }) => {
  return (
    <div className="auth-page">
      <Flex className="auth-page-container" justify="center" align="center">
        <div className="auth-content">{children}</div>
      </Flex>
    </div>
  )
}

export default AuthLayout

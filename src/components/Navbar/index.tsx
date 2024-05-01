import React from 'react'
import { connect } from 'react-redux'
import { Flex } from 'antd'

import Logo from 'components/common/Logo'
import { AuthState } from 'reducers/types'
import { RootState } from 'store'
import CurrentUserAvatar from 'common/CurrentUserAvatar'
import Notifications from 'components/Notifications'

interface Props {
  auth: AuthState
}

const Navbar = ({ auth }: Props) => {
  return (
    <div className="navbar-container">
      <Flex justify="space-between">
        <div className="navbar-head">
          <Logo />
        </div>
        <Flex className="navbar-tail" align="center" gap={16}>
          <Notifications />
          <CurrentUserAvatar />
        </Flex>
      </Flex>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({ auth: state.auth })

export default connect(mapStateToProps)(Navbar)

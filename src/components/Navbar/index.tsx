import React from 'react'
import { connect } from 'react-redux'
import { Flex } from 'antd'

import Logo from 'components/common/Logo'
import { AuthState } from 'reducers/types'
import './index.scss'
import { RootState } from 'store'
import CurrentUserAvatar from 'common/CurrentUserAvatar'

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
        <div className="navbar-tail">
          <CurrentUserAvatar />
        </div>
      </Flex>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({ auth: state.auth })

export default connect(mapStateToProps)(Navbar)

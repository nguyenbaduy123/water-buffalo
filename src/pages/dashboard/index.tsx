import withAuth from 'hocs/withAuth'
import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd'

import { AuthState } from 'reducers/types'
import { AppDispatch, RootState } from 'store'
import Sidebar from 'feature/dashboard/Sidebar'
import './index.scss'

interface Props {
  auth: AuthState
  dispatch: AppDispatch
}

const Dashboard: NextPage<Props> = (props: Props) => {
  return (
    <div>
      <Row className="dashboard-container">
        <Col>
          <Sidebar />
        </Col>
        <Col>
          <div className="dashboard-page">
            <h1>Welcome </h1>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({ auth: state.auth })

export default connect(mapStateToProps)(withAuth(Dashboard))

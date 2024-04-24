import withAuth from 'hocs/withAuth'
import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd'

import { AuthState } from 'reducers/types'
import { AppDispatch, RootState } from 'store'
import MainLayout from 'layouts/MainLayout'
import Sidebar from 'feature/dashboard/Sidebar'
import './index.scss'

interface Props {
  auth: AuthState
  dispatch: AppDispatch
}

const Dashboard: NextPage<Props> = (props: Props) => {
  return (
    <MainLayout>
      <Row className="dashboard-container">
        <Col>
          <Sidebar />
        </Col>
        <Col>
          <div className="dashboard-page">123ss123</div>
        </Col>
      </Row>
    </MainLayout>
  )
}

const mapStateToProps = (state: RootState) => ({ auth: state.auth })

export default connect(mapStateToProps)(withAuth(Dashboard))

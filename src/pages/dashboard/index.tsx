import withAuth from 'hocs/withAuth'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, Col, Flex, Row } from 'antd'

import { AuthState } from 'reducers/types'
import { AppDispatch, RootState } from 'store'
import Sidebar from 'feature/dashboard/Sidebar'
import './index.scss'
import LifeApi from 'api/LifeApi'
import { UserStatistics } from 'types/global'
import CurrentUserAvatar from 'common/CurrentUserAvatar'
import ReactCountryFlag from 'react-country-flag'
import { CheckCircle, DotsThreeCircle, XCircle } from '@phosphor-icons/react'
import { COLORS } from 'utils/css'

const statusToIcon = {
  open: <DotsThreeCircle size={20} color={COLORS.green[6]} />,
  not_planned: <XCircle size={20} color={COLORS.gray[6]} />,
  completed: <CheckCircle size={20} color={COLORS.purple[6]} />,
}

interface Props {
  auth: AuthState
  dispatch: AppDispatch
}

const Dashboard: NextPage<Props> = ({ auth }) => {
  const [userStatistics, setUserStatistics] =
    React.useState<UserStatistics | null>(null)

  useEffect(() => {
    getUserStatistics()
  }, [])

  const getUserStatistics = async () => {
    const resp = await LifeApi.getUserStatistics()

    if (resp.success) {
      setUserStatistics(resp.statistics)
    }
  }

  return (
    <div>
      <Row className="dashboard-container">
        <Col style={{ width: 360 }}>
          <Sidebar />
        </Col>
        <Col style={{ width: 'calc(100% - 360px)' }}>
          <div className="dashboard-page" style={{ margin: '0 46px' }}>
            <h1>Welcome {auth.name || auth.username}</h1>

            <Row gutter={16}>
              <Col span={12}>
                <Card style={{ fontSize: 16 }}>
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
                </Card>
              </Col>
              <Col span={12}>
                <Card style={{ fontSize: 16, height: '100%' }}>
                  <Flex className="mb4">
                    Projects: {userStatistics?.projects || 0}
                  </Flex>
                  <Flex className="mb4" gap={8}>
                    Issue:{' '}
                    {userStatistics?.issues.map((issue) => (
                      <Flex
                        key={issue.status}
                        gap={8}
                        align="center"
                        style={{ marginRight: 16 }}
                      >
                        {issue.count}
                        {statusToIcon[issue.status]}
                      </Flex>
                    ))}
                  </Flex>
                  <Flex>
                    Owner of: {userStatistics?.owner_projects || 0} projects
                  </Flex>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({ auth: state.auth })

export default connect(mapStateToProps)(withAuth(Dashboard))

import { Button, Col, Flex, Row, Table } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { Team } from 'types/organization'
import ModalCreateNewTeam from '../ModalCreateNewTeam'
import RenderUser from 'common/RenderUser'
import { User } from 'types/global'

interface Props {
  organization: RootState['organization']['currentOrganization']
  userOrganization: RootState['organization']['currentUserOrganization']
}

const OrganizationTeams: React.FC<Props> = ({
  organization,
  userOrganization,
}) => {
  if (!organization) return null

  const [currentTeam, setCurrentTeam] = React.useState<null | Team>()

  const [openCreateTeamModal, setOpenCreateTeamModal] = React.useState(false)

  const getCurrentTeamMembers = () => {
    if (!currentTeam) return []

    return organization.users.filter((u) => currentTeam.user_ids.includes(u.id))
  }

  const teamsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ]

  const membersColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (x: string, record: User) => <RenderUser user={record} />,
    },
  ]

  return (
    <div className="organization-teams">
      <Flex
        align="center"
        justify="space-between"
        className="organization-teams-header"
      >
        <h1>Teams</h1>
        <div>
          <Button type="primary" onClick={() => setOpenCreateTeamModal(true)}>
            Create New Team
          </Button>
        </div>
      </Flex>
      <Row>
        <Col span={12}>
          <Table
            title={() => 'Teams'}
            dataSource={organization.teams}
            bordered
            rowKey={(record) => record.id}
            rowSelection={{
              onSelect: (record) => setCurrentTeam(record),
              hideSelectAll: true,
              type: 'radio',
              selectedRowKeys: currentTeam ? [currentTeam.id] : [],
              // getCheckboxProps: (record) => ({}),
            }}
            columns={teamsColumns}
            pagination={false}
          />
        </Col>
        <Col span={12}>
          <Table
            title={() => 'Members'}
            dataSource={getCurrentTeamMembers()}
            pagination={false}
            columns={membersColumns}
            bordered
          />
        </Col>
      </Row>

      <ModalCreateNewTeam
        users={organization.users}
        open={openCreateTeamModal}
        onCancel={() => setOpenCreateTeamModal(false)}
        organization={organization}
      />
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  organization: state.organization.currentOrganization,
  userOrganization: state.organization.currentUserOrganization,
})

export default connect(mapStateToProps)(OrganizationTeams)

import { Eye, Handshake } from '@phosphor-icons/react'
import { Button, Divider, Flex, Input, Modal, Switch, Typography } from 'antd'
import LifeApi from 'api/LifeApi'
import ModalTransferProject from 'feature/project/ModalTransfer'
import SettingItem from 'feature/project/SettingItem'
import withAuth from 'hocs/withAuth'
import SettingLayout from 'layouts/SettingLayout'
import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'

interface Props {
  auth: RootState['auth']
  currentProject: RootState['project']['currentProject']
}

const SettingGeneral: NextPage<Props> = ({ currentProject, auth }: Props) => {
  const [openTransferModal, setOpenTransferModal] = React.useState(false)

  const confirmClose = () => {
    Modal.confirm({
      title: 'Close Project',
      content: 'Are you sure you want to close this project?',
      onOk: handleCloseProject,
    })
  }

  const handleCloseProject = async () => {
    if (!currentProject) return
    const resp = await LifeApi.closeProject(currentProject.id)

    if (resp.success) {
      location.href = '/dashboard'
    }
  }

  return (
    <SettingLayout currentTabId="general">
      <div>
        <Flex vertical gap={20}>
          <div>
            <Typography.Title level={5}>Project Name</Typography.Title>
            <Input value={currentProject?.name} disabled />
          </div>
          <div>
            <Typography.Title level={5}>Description</Typography.Title>
            <Input.TextArea value={currentProject?.description} />
          </div>
          <Flex justify="end">
            <Button type="primary" onClick={confirmClose}>
              Close
            </Button>
          </Flex>
        </Flex>

        <Divider />
        <div className="project-settings-general">
          <SettingItem
            icon={<Eye size={24} />}
            title="Issue visibility"
            description="Members can only see issues assigned to them or issues that have not been assigned to anyone."
          >
            <Switch />
          </SettingItem>
          <Divider />
          {currentProject?.owner_id == auth.userId && (
            <SettingItem
              title="Transfer Ownership"
              description="Transfer project ownership to another user."
              icon={<Handshake size={24} />}
            >
              <Button
                type="primary"
                danger
                onClick={() => setOpenTransferModal(true)}
              >
                Transfer
              </Button>
            </SettingItem>
          )}
        </div>
        {currentProject && (
          <ModalTransferProject
            open={openTransferModal}
            onCancel={() => setOpenTransferModal(false)}
            projectId={currentProject?.id}
          />
        )}
      </div>
    </SettingLayout>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(withAuth(SettingGeneral))

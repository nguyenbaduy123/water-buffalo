import { Button, Divider, Flex, Input, Modal, Typography } from 'antd'
import LifeApi from 'api/LifeApi'
import ModalTransferProject from 'feature/project/ModalTransfer'
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
        <div className="group-actions">
          <Flex className="group-actions-list" vertical>
            <Flex className="group-actions-item" justify="space-between">
              <div className="action-info">
                <h4 className="mb4">Transfer Ownership</h4>
                <div className="action-descriptions">
                  <p>Transfer project ownership to another user.</p>
                </div>
              </div>
              {currentProject?.owner_id == auth.userId && (
                <div className="action-button">
                  <Button
                    type="primary"
                    danger
                    onClick={() => setOpenTransferModal(true)}
                  >
                    Transfer
                  </Button>

                  {currentProject && (
                    <ModalTransferProject
                      open={openTransferModal}
                      onCancel={() => setOpenTransferModal(false)}
                      projectId={currentProject?.id}
                    />
                  )}
                </div>
              )}
            </Flex>
          </Flex>
        </div>
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

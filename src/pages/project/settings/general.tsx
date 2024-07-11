import { Eye, Handshake, Lock } from '@phosphor-icons/react'
import { updateProjectSuccess } from 'actions/project'
import { Button, Divider, Flex, Input, Modal, Switch, Typography } from 'antd'
import LifeApi from 'api/LifeApi'
import ModalTransferProject from 'feature/project/ModalTransfer'
import SettingItem from 'feature/project/SettingItem'
import withAuth from 'hocs/withAuth'
import SettingLayout from 'layouts/SettingLayout'
import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { notificationSuccess } from 'utils'

interface Props {
  auth: RootState['auth']
  currentProject: RootState['project']['currentProject']
  dispatch: AppDispatch
}

const SettingGeneral: NextPage<Props> = ({
  currentProject,
  auth,
  dispatch,
}: Props) => {
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

  const handleUpdateProjectDescription = (description: string) => {
    if (!currentProject) return
    dispatch(
      updateProjectSuccess({ project: { ...currentProject, description } })
    )
  }

  const handleChangeSettings = async (key: string, value: boolean) => {
    if (!currentProject) return
    const resp = await LifeApi.updateProject(currentProject.id, {
      settings: {
        [key]: value,
      },
    })

    if (resp.success) {
      dispatch(
        updateProjectSuccess({
          project: {
            ...currentProject,
            settings: { ...currentProject.settings, [key]: value },
          },
        })
      )
    }
  }

  const doUpdateDescription = async () => {
    if (!currentProject) return
    const resp = await LifeApi.updateProject(currentProject.id, {
      description: currentProject.description,
    })

    if (resp.success) {
      notificationSuccess(resp.message || 'Project description updated.')
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
            <Input.TextArea
              value={currentProject?.description}
              onChange={(e) => handleUpdateProjectDescription(e.target.value)}
            />
          </div>
          <Flex justify="end">
            <Button type="primary" onClick={doUpdateDescription}>
              Update
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
            <Switch
              checked={currentProject?.settings?.only_assignee_can_see_issue}
              onChange={(checked) =>
                handleChangeSettings('only_assignee_can_see_issue', checked)
              }
            />
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
          <Divider />
          <SettingItem
            title="Close Project"
            description="Close this project. This action cannot be undone."
            icon={<Lock size={24} />}
          >
            <Button type="primary" danger onClick={confirmClose}>
              Close
            </Button>
          </SettingItem>
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

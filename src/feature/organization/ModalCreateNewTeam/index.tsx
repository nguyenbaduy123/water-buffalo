import { Flex, Input, Modal, Select } from 'antd'
import LifeApi from 'api/LifeApi'
import RenderUser from 'common/RenderUser'
import { UPDATE_ORGANIZATION } from 'constants/action'
import { useAppDispatch } from 'hooks'
import React from 'react'
import { AppDispatch } from 'store'
import { User } from 'types/global'
import { Organization } from 'types/organization'
import { notificationSuccess } from 'utils'

interface Props {
  users: User[]
  open: boolean
  onCancel: () => void
  organization: Organization
}

const ModalCreateNewTeam: React.FC<Props> = ({
  users,
  open,
  onCancel,
  organization,
}) => {
  const [teamName, setTeamName] = React.useState('')
  const [teamDescription, setTeamDescription] = React.useState('')
  const [selectedMembers, setSelectedMembers] = React.useState<string[]>([])

  const dispatch: AppDispatch = useAppDispatch()

  const resetState = () => {
    setTeamName('')
    setTeamDescription('')
    setSelectedMembers([])
    onCancel()
  }

  const handleCreateTeam = async () => {
    const resp = await LifeApi.createNewTeam(organization.id, {
      name: teamName,
      description: teamDescription,
      user_ids: selectedMembers,
    })

    if (resp.success) {
      resetState()
      notificationSuccess('Team created successfully')
      dispatch({
        type: UPDATE_ORGANIZATION,
        payload: {
          organization: {
            ...organization,
            teams: [resp.team, ...organization.teams],
          },
        },
      })
    }
  }

  return (
    <Modal
      title="Create New Team"
      open={open}
      onCancel={onCancel}
      okText="Create"
      onOk={handleCreateTeam}
      okButtonProps={{
        disabled: !teamName || !selectedMembers.length,
      }}
    >
      <Flex vertical gap={12}>
        <Input
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <Input.TextArea
          placeholder="Description"
          value={teamDescription}
          onChange={(e) => setTeamDescription(e.target.value)}
        />
        <Select
          value={selectedMembers}
          onChange={(value) => setSelectedMembers(value as string[])}
          mode="multiple"
          placeholder="Select Members"
          options={users.map((u) => ({
            label: <RenderUser user={u} />,
            value: u.id,
          }))}
        />
      </Flex>
    </Modal>
  )
}

export default ModalCreateNewTeam

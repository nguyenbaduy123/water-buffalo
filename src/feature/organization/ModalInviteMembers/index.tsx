import LifeApi from 'api/LifeApi'
import ModalInviteUsers from 'components/ModalInviteUsers'
import React from 'react'
import { User } from 'types/global'
import { successNotification } from 'utils'

interface Props {
  open: boolean
  onCancel: () => void
  organizationId: string
}

const ModalInviteMembers = ({ open, onCancel, organizationId }: Props) => {
  const handleInvite = async (userId: User['id']) => {
    const resp = await LifeApi.inviteToOrganization(organizationId, userId)

    if (resp.success) {
      successNotification('Success', 'Invitation sent')
    }
  }

  return (
    <ModalInviteUsers
      onCancel={onCancel}
      open={open}
      title="Invite to organization"
      onInvite={handleInvite}
    />
  )
}

export default ModalInviteMembers

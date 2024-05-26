import { UserPlus } from '@phosphor-icons/react'
import { Flex } from 'antd'
import LifeApi from 'api/LifeApi'
import ModalInviteUsers from 'components/ModalInviteUsers'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { User } from 'types/global'
import { Channel } from 'types/organization'
import { errorNotification } from 'utils'

interface Props {
  currentChannel?: Channel | null
  currentOrganization: RootState['organization']['currentOrganization']
}

const ChannelChatMenu = ({ currentChannel, currentOrganization }: Props) => {
  const [openModalAddUser, setOpenModalAddUser] = React.useState(false)

  const handleInvite = async (userId: string) => {
    if (!currentOrganization || !currentChannel) return
    const resp = await LifeApi.addUserToChannel(
      currentOrganization.id,
      currentChannel.id,
      userId
    )

    if (resp.success) {
    } else {
      errorNotification('Error', 'Failed to invite user')
    }
  }

  return (
    <div>
      <Flex
        justify="space-between"
        style={{
          borderBottom: '1px solid var(--dark-7)',
          padding: '8px 16px',
        }}
      >
        {currentChannel && (
          <>
            <Flex className="chat-menu-head">
              <div></div>
            </Flex>
            <Flex className="chat-menu-tail">
              <UserPlus
                size={24}
                cursor="pointer"
                onClick={() => setOpenModalAddUser(true)}
              />
            </Flex>
          </>
        )}
      </Flex>
      <ModalInviteUsers
        open={openModalAddUser}
        onCancel={() => setOpenModalAddUser(false)}
        onInvite={handleInvite}
        title="Invite to channel"
        users={currentOrganization?.users}
      />
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentOrganization: state.organization.currentOrganization,
})

export default connect(mapStateToProps)(ChannelChatMenu)

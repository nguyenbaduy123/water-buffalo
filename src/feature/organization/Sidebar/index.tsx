import { Button, Dropdown, Flex, Tooltip } from 'antd'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { Channel } from 'types/organization'

import './style.scss'
import { CaretDown, Plus } from '@phosphor-icons/react'
import ModalCreateNewChannel from '../ModalCreateNewChannel'
import { selectChannel } from 'actions/channel'
import ModalInviteUsers from 'components/ModalInviteUsers'
import ModalInviteMembers from '../ModalInviteMembers'

interface Props {
  currentOrganization: RootState['organization']['currentOrganization']
  dispatch: AppDispatch
  currentChannelId: string
}

const OrganizationSidebar = ({
  currentOrganization,
  dispatch,
  currentChannelId,
}: Props) => {
  const [openModalCreateChannel, setOpenModalCreateChannel] = useState(false)
  const [openModalInviteMembers, setOpenModalInviteMembers] = useState(false)

  const handleSelectChannel = (channelId: string) => {
    dispatch(selectChannel(channelId))
  }

  const renderChannelItem = (channel: Channel) => {
    return (
      <div
        key={channel.id}
        className={`channel-item ${
          currentChannelId === channel.id ? 'selected' : ''
        }`}
        onClick={() => handleSelectChannel(channel.id)}
      >
        <div>{channel.name}</div>
      </div>
    )
  }

  return (
    <div className="organization-sidebar">
      <h3 className="channels-title">
        <Flex align="center" justify="space-between">
          <div>{currentOrganization?.name}</div>
          <div>
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              menu={{
                items: [
                  {
                    key: '1',
                    label: 'Create a new Channel',
                    onClick: () => setOpenModalCreateChannel(true),
                  },
                  {
                    key: '2',
                    label: 'Invite members',
                    onClick: () => setOpenModalInviteMembers(true),
                  },
                ],
              }}
            >
              <Button icon={<CaretDown />} />
            </Dropdown>
          </div>
        </Flex>
      </h3>
      {currentOrganization && (
        <Flex vertical gap={8}>
          {currentOrganization.channels.map(renderChannelItem)}
        </Flex>
      )}
      <ModalCreateNewChannel
        open={openModalCreateChannel}
        onCancel={() => setOpenModalCreateChannel(false)}
        organizationId={currentOrganization?.id || ''}
      />

      <ModalInviteMembers
        organizationId={currentOrganization?.id || ''}
        open={openModalInviteMembers}
        onCancel={() => setOpenModalInviteMembers(false)}
      />
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    currentOrganization: state.organization.currentOrganization,
    currentChannelId: state.channel.currentChannelId,
  }
}

export default connect(mapStateToProps)(OrganizationSidebar)

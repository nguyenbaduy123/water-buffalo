import { Button, Flex, Tooltip } from 'antd'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { Channel } from 'types/organization'

import './style.scss'
import { Plus } from '@phosphor-icons/react'
import ModalCreateNewChannel from '../ModalCreateNewChannel'
import { selectChannel } from 'actions/channel'

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
      <Flex align="center" justify="space-between">
        <h3 className="channels-title">Channels</h3>
        <Tooltip title="Create a new channel">
          <Button onClick={() => setOpenModalCreateChannel(true)}>
            <Plus size={16} />
          </Button>
        </Tooltip>
      </Flex>
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

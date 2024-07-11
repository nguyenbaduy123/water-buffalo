import { MessengerLogo, UserPlus, UsersThree } from '@phosphor-icons/react'
import { Button, Input, Popover, Select } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import './style.scss'
import { AppDispatch, RootState } from 'store'
import { connect } from 'react-redux'
import ModalInviteUsers from 'components/ModalInviteUsers'
import LifeApi from 'api/LifeApi'
import {
  loadConversations,
  newConversation,
  selectConversation,
} from 'actions/conversation'
import ConversationListItem from 'components/ConversationListItem'
import { Conversation } from 'types/message'
import { User } from 'types/global'
import RenderUser from 'common/RenderUser'
import { notificationError } from 'utils'

interface Props {
  auth: RootState['auth']
  conversation: RootState['conversation']
  dispatch: AppDispatch
}

const Messenger: FC<Props> = ({ auth, dispatch, conversation }) => {
  if (!auth.userId) return

  const [openSearchUser, setOpenSearchUser] = useState(false)
  const [openCreateGroup, setOpenCreateGroup] = useState(false)

  const [groupUsers, setGroupUsers] = useState<User[]>([])
  const [groupName, setGroupName] = useState('')

  const handleNewInbox = async (userId: string) => {
    const resp = await LifeApi.createConversation({
      user_ids: [auth.userId, userId],
      type: 'INBOX',
    })

    if (resp.success) {
      dispatch(newConversation(resp.conversation))
      setOpenSearchUser(false)
    }
  }

  const handleCreateGroupConversation = async () => {
    const resp = await LifeApi.createConversation({
      user_ids: [...groupUsers.map((u) => u.id), auth.userId],
      type: 'GROUP_INBOX',
      name: groupName,
    })

    if (resp.success) {
      dispatch(newConversation(resp.conversation))
      setOpenCreateGroup(false)
    } else {
      notificationError(resp.message || 'Failed to create group')
    }
  }

  useEffect(() => {
    dispatch(loadConversations())
  }, [])

  const renderContent = () => {
    return (
      <div className="chats-container">
        <div className="chats-header">
          <div className="title">
            <div className="title-txt">Chats</div>
            <div className="title-icons">
              <div
                className="icon-item"
                onClick={() => setOpenSearchUser(true)}
              >
                <UserPlus size={20} />
              </div>
              <div
                className="icon-item"
                onClick={() => setOpenCreateGroup(true)}
              >
                <UsersThree size={20} />
              </div>
            </div>
          </div>
          <div>
            <Input
              className="inbox-search-messenger"
              placeholder="Search Messenger"
            />
          </div>
        </div>
        <div className="chats-list">
          {conversation.data.map((c) => (
            <ConversationListItem
              conversation={c}
              key={c.id}
              auth={auth}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Popover
        trigger={['click']}
        content={renderContent()}
        placement="bottom"
        arrow={false}
      >
        <div>
          <MessengerLogo />
        </div>
      </Popover>
      <ModalInviteUsers
        open={openSearchUser}
        title="New chat"
        onCancel={() => setOpenSearchUser(false)}
        onInvite={handleNewInbox}
        btnText="Chat"
      />
      <ModalInviteUsers
        header={
          <div className="">
            <Input
              className="mb12"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <div className="mb12">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select users"
                value={groupUsers.map((u) => u.id)}
                options={groupUsers.map((u) => ({
                  label: <RenderUser user={u} />,
                  value: u.id,
                }))}
              />
            </div>
          </div>
        }
        open={openCreateGroup}
        title="Create group"
        onCancel={() => setOpenCreateGroup(false)}
        onInvite={(userId, user) => setGroupUsers((prev) => [...prev, user])}
        btnText="Add"
        footer={
          <div>
            <Button type="primary" onClick={handleCreateGroupConversation}>
              Create
            </Button>
          </div>
        }
      />
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
    conversation: state.conversation,
  }
}

export default connect(mapStateToProps)(Messenger)

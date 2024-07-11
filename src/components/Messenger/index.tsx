import { MessengerLogo, UserPlus, UsersThree } from '@phosphor-icons/react'
import { Input, Popover } from 'antd'
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

interface Props {
  auth: RootState['auth']
  conversation: RootState['conversation']
  dispatch: AppDispatch
}

const Messenger: FC<Props> = ({ auth, dispatch, conversation }) => {
  if (!auth.userId) return

  const [openSearchUser, setOpenSearchUser] = useState(false)

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
              <div className="icon-item">
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

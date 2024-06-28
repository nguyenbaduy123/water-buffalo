import { MessengerLogo, UserPlus, UsersThree } from '@phosphor-icons/react'
import { Input, Popover } from 'antd'
import React, { FC, useState } from 'react'
import './style.scss'
import { AppDispatch, RootState } from 'store'
import { connect } from 'react-redux'
import ModalInviteUsers from 'components/ModalInviteUsers'
import LifeApi from 'api/LifeApi'
import { newConversation } from 'actions/conversation'

interface Props {
  auth: RootState['auth']
  dispatch: AppDispatch
}

const Messenger: FC<Props> = ({ auth, dispatch }) => {
  if (!auth.userId) return

  const [openSearchUser, setOpenSearchUser] = useState(false)

  const handleNewInbox = async (userId: string) => {
    const resp = await LifeApi.createConversation({
      user_ids: [auth.userId, userId],
      type: 'INBOX',
    })

    if (resp.success) {
      dispatch(newConversation(resp.conversation))
    }
  }

  const renderListConversations = () => {
    return <div></div>
  }

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
        <div className="chats-list"></div>
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
      />
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Messenger)

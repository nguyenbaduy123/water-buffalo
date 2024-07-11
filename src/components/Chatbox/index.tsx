import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import ConversationAvatar from './ConversationAvatar'
import { getConversationName } from 'utils'
import { X } from '@phosphor-icons/react'
import { unselectConversation } from 'actions/conversation'
import MessageList from 'components/MessageList'
import ReplyInbox from 'components/ReplyInbox'

interface Props {
  conversation: RootState['conversation']['selected']
  auth: RootState['auth']
  dispatch: AppDispatch
}

const ChatBox: React.FC<Props> = ({ dispatch, conversation, auth }) => {
  if (!conversation) return null

  const handleClose = () => {
    dispatch(unselectConversation())
  }

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <div className="chatbox-header-info">
          <ConversationAvatar
            conversation={conversation}
            userId={auth.userId}
          />
          <div className="conversation-name">
            {getConversationName(conversation, auth.userId)}
          </div>
        </div>
        <div className="chatbox-header-actions">
          <div className="chatbox-close-btn" onClick={handleClose}>
            <X size={16} weight="bold" />
          </div>
        </div>
      </div>
      <div className="chatbox-body">
        <MessageList />
      </div>
      <div className="chatbox-footer">
        <ReplyInbox conversationId={conversation.id} userId={auth.userId} />
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  conversation: state.conversation.selected,
  auth: state.auth,
})

export default connect(mapStateToProps)(ChatBox)

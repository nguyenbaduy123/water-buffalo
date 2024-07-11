import { selectConversation } from 'actions/conversation'
import { Flex } from 'antd'
import UserAvatar from 'common/UserAvatar'
import ConversationAvatar from 'components/Chatbox/ConversationAvatar'
import React from 'react'
import { AppDispatch, RootState } from 'store'
import { Conversation } from 'types/message'
import { fromNow } from 'utils'
interface Props {
  conversation: Conversation
  auth: RootState['auth']
  dispatch: AppDispatch
}

const ConversationListItem: React.FC<Props> = ({
  conversation,
  dispatch,
  auth,
}) => {
  const otherUsers = conversation.users.filter((u) => u.id !== auth.userId)

  const onSelectConversation = () => {
    dispatch(selectConversation(conversation))
  }

  const conversationAvatar = (
    <ConversationAvatar conversation={conversation} userId={auth.userId} />
  )

  const conversationName =
    conversation.name || otherUsers.map((u) => u.name || u.username).join(', ')
  return (
    <Flex
      className="conversation-list-item"
      gap={8}
      onClick={onSelectConversation}
    >
      <div className="conversation-avatar">{conversationAvatar}</div>
      <Flex vertical gap={4} style={{ width: '100%' }}>
        <div className="conversation-title">{conversationName}</div>
        <Flex justify="space-between" className="conversation-snippet">
          <div className="conversation-snippet-text">
            {conversation.snippet}
          </div>
          <div>{fromNow(conversation.updated_at)}</div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ConversationListItem

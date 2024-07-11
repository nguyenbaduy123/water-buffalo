import UserAvatar from 'common/UserAvatar'
import { cloneDeep } from 'lodash'
import React from 'react'
import { Conversation } from 'types/message'

interface Props {
  conversation: Conversation
  userId: string
}

const ConversationAvatar: React.FC<Props> = ({ conversation, userId }) => {
  const getAvatar = () => {
    switch (conversation.type) {
      case 'INBOX':
        const userAvatar = conversation.users.find((user) => user.id !== userId)

        return <UserAvatar user={userAvatar} size={28} round />

      case 'GROUP_INBOX':
        const usersRender = cloneDeep(conversation.users).slice(0, 4)
        const avatars = usersRender.map((user) => (
          <UserAvatar user={user} size={28} round className="user-avatar" />
        ))

        return <div className="group-avatar">{avatars}</div>

      default:
        return <div></div>
    }
  }

  return getAvatar()
}

export default ConversationAvatar

import React, { memo } from 'react'
import { AuthState } from 'reducers/types'
import { User } from 'types/global'
import { Message } from 'types/message'

interface Props {
  message: Message
  auth: AuthState
  fromUser: User
  prevMsgFromId?: string
  nextMsgFromId?: string
}

const MessageListItem = ({
  message,
  auth,
  fromUser,
  prevMsgFromId,
  nextMsgFromId,
}: Props) => {
  const getClassName = () => {
    let className = 'message-list-item'
    const fromId = message.from_id

    if (auth.userId == fromId) className += ' message--mine'
    else className += ' message--other'

    if (prevMsgFromId == fromId) className += ' message--same-user-top'

    if (nextMsgFromId == fromId) className += ' message--same-user-bottom'

    return className
  }

  return (
    <div className={getClassName()} id={`message_${message.id}`}>
      <div className="message-content">{message.message}</div>
    </div>
  )
}

export default memo(MessageListItem)

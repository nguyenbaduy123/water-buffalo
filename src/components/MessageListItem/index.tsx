import React, { memo } from 'react'
import { AuthState } from 'reducers/types'
import { User } from 'types/global'
import { Message } from 'types/message'
import { Attachment } from 'types/project'

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

  const renderAttachment = (attachment: Attachment) => {
    switch (attachment.type) {
      case 'image':
        return (
          <div>
            <img
              src={attachment.url}
              alt={attachment.name}
              height={128}
              width={128}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )
      default:
        return null
    }
  }

  const renderMessageAttachments = () => {
    if (!message.attachments?.length) return null

    return (
      <div className="message-attachments">
        {message.attachments.map(renderAttachment)}
      </div>
    )
  }

  return (
    <div className={getClassName()} id={`message_${message.id}`}>
      <div className="message-content">{message.message}</div>
      {renderMessageAttachments()}
    </div>
  )
}

export default memo(MessageListItem)

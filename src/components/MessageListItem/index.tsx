import { FileArrowDown } from '@phosphor-icons/react'
import { Flex } from 'antd'
import UserAvatar from 'common/UserAvatar'
import React, { memo } from 'react'
import { AuthState } from 'reducers/types'
import { User } from 'types/global'
import { Message } from 'types/message'
import { Attachment } from 'types/project'
import { COLORS } from 'utils/css'

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
      case 'video':
        return (
          <div>
            <video controls width={128} height={128}>
              <source src={attachment.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      default:
        return (
          <div>
            <a
              style={{
                border: '1px solid #e8e8e8',
                borderRadius: '50%',
                display: 'inline-block',
                padding: 4,
              }}
              href={attachment.url}
            >
              <FileArrowDown size={20} color={COLORS.blue[4]} weight="fill" />
            </a>
          </div>
        )
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
    <Flex align="center">
      {auth.userId !== message.from_id && (
        <div style={{ width: 30, marginBottom: 2 }}>
          {nextMsgFromId != message.from_id && (
            <UserAvatar user={fromUser} size={22} round />
          )}
        </div>
      )}
      <div className={getClassName()} id={`message_${message.id}`}>
        {message.message && (
          <div className="message-content">{message.message}</div>
        )}
        {renderMessageAttachments()}
      </div>
    </Flex>
  )
}

export default memo(MessageListItem)

import React from 'react'
import './index.scss'
import { User } from 'types/global'
import { Flex } from 'antd'
import UserAvatar from 'common/UserAvatar'

interface Props {
  id: string
  user: User
  content: string
  time: React.ReactNode
  rightSide?: boolean
}

const CommentIssueItem = ({
  id,
  user,
  content,
  time,
  rightSide = false,
}: Props) => {
  const x = [
    <div className="user-avatar" key="avatar">
      <UserAvatar name={user.username} src={user.avatar_url} size={32} round />
    </div>,
    <div className="comment-content" key="comment">
      <Flex className="comment-content-head" gap={12} align="center">
        <div className="user-name">{user.username}</div>
        <div className="comment-time">{time}</div>
      </Flex>
      <div
        className="comment-text"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>,
  ]
  return (
    <div
      className={`issue-comment-wrapper  ${
        rightSide ? 'right-side-issue' : ''
      }`}
    >
      <div className="issue-comment" key={id} id={id}>
        <Flex gap={8}>{!rightSide ? x : x.reverse()}</Flex>
      </div>
    </div>
  )
}

export default CommentIssueItem

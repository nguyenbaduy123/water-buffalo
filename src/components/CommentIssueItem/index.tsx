import React from 'react'
import './index.scss'
import { User } from 'types/global'
import { Flex } from 'antd'
import UserAvatar from 'common/UserAvatar'

interface Props {
  user: User
  content: React.ReactNode
  time: React.ReactNode
  leftSide?: boolean
}

const CommentIssueItem = ({ user, content, time, leftSide = true }: Props) => {
  const x = [
    <div className="user-avatar">
      <UserAvatar name={user.username} src={user.avatar_url} size={32} round />
    </div>,
    <div className="comment-content">
      <Flex className="comment-content-head" gap={12} align="center">
        <div className="user-name">{user.username}</div>
        <div className="comment-time">{time}</div>
      </Flex>
      <div className="comment-text">{content}</div>
    </div>,
  ]
  return (
    <div className="issue-comment">
      <Flex gap={8}>{leftSide ? x : x.reverse()}</Flex>
    </div>
  )
}

export default CommentIssueItem

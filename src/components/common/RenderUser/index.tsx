import { Flex } from 'antd'
import UserAvatar from 'common/UserAvatar'
import React from 'react'
import { User } from 'types/global'

interface Props {
  user: User
  avatarSize?: number
  gap?: number
}

const RenderUser = ({ user, gap = 4, avatarSize = 24 }: Props) => {
  return (
    <Flex gap={gap} align="center">
      <UserAvatar user={user} size={avatarSize} round />
      <span>{user.name || user.username}</span>
    </Flex>
  )
}

export default RenderUser

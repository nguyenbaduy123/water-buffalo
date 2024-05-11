import Avatar from 'react-avatar'

import { UserAvatarProps } from './UserAvatar'
import { User } from 'types/global'
import { Tooltip } from 'antd'

interface Props extends Omit<UserAvatarProps, 'name'> {
  name?: string | null
  user?: User
  withTooltip?: boolean
}

const UserAvatar = ({
  user,
  size,
  src,
  name,
  withTooltip,
  ...props
}: Props) => {
  const sizeString = size?.toString()

  const avatar = user ? (
    <Avatar
      size={sizeString}
      src={user.avatar_url || undefined}
      name={user.name || user.username || user.email}
      {...props}
    />
  ) : (
    <Avatar
      size={sizeString}
      src={src || undefined}
      name={name || undefined}
      {...props}
    />
  )

  return withTooltip ? (
    <Tooltip title={user?.name || user?.username || name}>
      <div style={{ display: 'inline-block' }}>{avatar}</div>
    </Tooltip>
  ) : (
    avatar
  )
}

export default UserAvatar

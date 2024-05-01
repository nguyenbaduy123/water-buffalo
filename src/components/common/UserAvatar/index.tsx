import Avatar from 'react-avatar'

import { UserAvatarProps } from './UserAvatar'

interface Props extends Omit<UserAvatarProps, 'name'> {
  name?: string | null
}

const UserAvatar = ({ size, src, name, ...props }: Props) => {
  return (
    <Avatar
      size={size?.toString()}
      src={src || undefined}
      name={name || undefined}
      {...props}
    />
  )
}

export default UserAvatar

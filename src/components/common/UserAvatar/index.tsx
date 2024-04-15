import Avatar from 'react-avatar'

import { UserAvatarProps } from './UserAvatar'

const UserAvatar = ({
  size,
  src,
  textSizeRatio = 1.5,
  ...props
}: UserAvatarProps) => {
  return (
    <Avatar
      {...props}
      size={size?.toString()}
      src={src || undefined}
      textSizeRatio={textSizeRatio}
    />
  )
}

export default UserAvatar

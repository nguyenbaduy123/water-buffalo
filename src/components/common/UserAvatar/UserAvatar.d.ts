import { ReactAvatarProps } from 'react-avatar'

interface UserAvatarProps extends Omit<ReactAvatarProps, 'src' | 'size'> {
  src?: string | null
  size?: string | number
}

import UserAvatar from 'common/UserAvatar'
import { UserAvatarProps } from 'common/UserAvatar/UserAvatar'
import { memo } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { mapStateToPropsFunc } from 'utils/redux'

interface Props extends Omit<UserAvatarProps, 'name' | 'src'> {
  username: string | null
  name: string | null
  avatarUrl: string | null
}

const CurrentUserAvatar = ({
  name,
  username,
  avatarUrl,
  round = true,
  size = 32,
  ...props
}: Props) => {
  return (
    <UserAvatar
      name={name || username}
      {...props}
      src={avatarUrl}
      round={round}
      size={size}
    />
  )
}

const mapStateToProps = (state: RootState) => ({
  name: state.auth.username,
  username: state.auth.username,
  avatarUrl: state.auth.avatar,
})

export default connect(mapStateToProps)(CurrentUserAvatar)

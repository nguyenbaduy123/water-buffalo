import UserAvatar from 'common/UserAvatar'
import { UserAvatarProps } from 'common/UserAvatar/UserAvatar'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { mapStateToPropsFunc } from 'utils/redux'

interface Props extends UserAvatarProps {
  auth: RootState['auth']
}

const CurrentUserAvatar = ({
  auth,
  round = true,
  size = 32,
  ...props
}: Props) => {
  return (
    <UserAvatar
      name={auth.name || auth.username || auth.email}
      {...props}
      round={round}
      size={size}
    />
  )
}

export default connect(mapStateToPropsFunc(['auth']))(CurrentUserAvatar)

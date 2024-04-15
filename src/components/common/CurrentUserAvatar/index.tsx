import UserAvatar from 'common/UserAvatar'
import { UserAvatarProps } from 'common/UserAvatar/UserAvatar'
import { connect } from 'react-redux'
import { RootState } from 'store'

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

const mapStateToProps = (state: RootState) => ({ auth: state.auth })

export default connect(mapStateToProps)(CurrentUserAvatar)

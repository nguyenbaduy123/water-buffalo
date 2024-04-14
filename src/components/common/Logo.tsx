import { Avatar, AvatarProps } from 'antd'
import Router from 'next/router'

interface Props extends Omit<AvatarProps, 'src' | 'size'> {
  size?: number
}

const Logo = ({ size = 32, ...props }: Props) => {
  const redirectToDashboard = () => Router.push('/dashboard')

  return (
    <div
      style={{
        borderRadius: '50%',
        backgroundColor: '#fff',
        width: size,
        height: size,
        paddingBottom: 0,
        position: 'relative',
        padding: 2,
        cursor: 'pointer',
      }}
      onClick={redirectToDashboard}
    >
      <Avatar src="/elixir.svg" {...props} size={size - 4} />
    </div>
  )
}

export default Logo

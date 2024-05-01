import { Badge, Dropdown } from 'antd'
import { Bell } from '@phosphor-icons/react'
import './index.scss'
import { connectAndMapStateToProps } from 'utils/redux'
import { NotificationState } from 'reducers/types'
import moment from 'moment'
import { naiveToUtc } from 'utils'
import NotificationItem from './NotificationItem'

interface Props {
  notification: NotificationState
}

const Notifications = ({ notification }: Props) => {
  const notifications = notification.data

  const items = notifications.map((item) => {
    return {
      key: item.id,
      label: <NotificationItem notification={item} />,
    }
  })

  return (
    <div className="notifications">
      <Dropdown trigger={['click']} menu={{ items }}>
        <Badge dot={!!notifications.length && !notifications[0].seen}>
          <Bell size={20} />
        </Badge>
      </Dropdown>
    </div>
  )
}

export default connectAndMapStateToProps(['notification'])(Notifications)

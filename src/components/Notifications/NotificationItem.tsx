import { UserPlus } from '@phosphor-icons/react'
import { Button, Flex } from 'antd'
import LifeApi from 'api/LifeApi'
import moment from 'moment'
import React, { useMemo } from 'react'
import { Notification } from 'types/global'
import { naiveToUtc, successNotification } from 'utils'

interface Props {
  notification: Notification
}

const NotificationItem = ({ notification }: Props) => {
  const renderTimeAgo = () => (
    <div className="time-ago">
      {moment(naiveToUtc(notification.inserted_at)).fromNow()}
    </div>
  )

  const renderBody = useMemo(() => {
    switch (notification.type) {
      case 'PROJECT_INVITATION':
        const acceptOrDecline = async (accept: boolean) => {
          const resp = await LifeApi.acceptOrDeclineInvitation(
            notification.detail.project_id,
            notification.detail.invitation_id,
            accept
          )

          if (resp.success) {
            successNotification(
              'Success',
              `Invitation has been ${accept ? 'accepted' : 'declined'}`
            )
          }
        }

        return (
          <Flex className="notification-item-body" gap={8}>
            <div className="notification-item-icon">
              <UserPlus size={32} />
            </div>
            <div className="notification-item-text">
              <div className="notification-item-title">
                {notification.message}
              </div>
              {renderTimeAgo()}
              <Flex align="center" gap={16} className="group-button">
                <Button
                  type="primary"
                  size="small"
                  onClick={() => acceptOrDecline(true)}
                >
                  Accept
                </Button>
                <Button
                  type="primary"
                  danger
                  size="small"
                  onClick={() => acceptOrDecline(false)}
                >
                  Decline
                </Button>
              </Flex>
            </div>
          </Flex>
        )

      case 'organization:invitation':
        const acceptOrDeclineOrganizationInvitation = async (
          accept: boolean
        ) => {
          const resp = await LifeApi.acceptOrDeclineOrganizationInvitation(
            notification.detail.organization_id,
            notification.detail.invitation_id,
            accept
          )

          if (resp.success) {
            successNotification(
              'Success',
              `Invitation has been ${accept ? 'accepted' : 'declined'}`
            )
          }
        }
        return (
          <Flex className="notification-item-body" gap={8}>
            <div className="notification-item-icon">
              <UserPlus size={32} />
            </div>
            <div className="notification-item-text">
              <div className="notification-item-title">
                {notification.message}
              </div>
              {renderTimeAgo()}
              <Flex align="center" gap={16} className="group-button">
                <Button
                  type="primary"
                  size="small"
                  onClick={() => acceptOrDeclineOrganizationInvitation(true)}
                >
                  Accept
                </Button>
                <Button
                  type="primary"
                  danger
                  size="small"
                  onClick={() => acceptOrDeclineOrganizationInvitation(false)}
                >
                  Decline
                </Button>
              </Flex>
            </div>
          </Flex>
        )
    }
  }, [])

  return <div className="notification-item">{renderBody}</div>
}

export default NotificationItem

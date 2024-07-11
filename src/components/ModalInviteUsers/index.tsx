import { Button, Flex, Input, Modal, ModalProps } from 'antd'
import LifeApi from 'api/LifeApi'
import UserAvatar from 'common/UserAvatar'
import { debounce } from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { User } from 'types/global'
import { fuzzySearch } from 'utils'
import { COLORS } from 'utils/css'

interface Props extends ModalProps {
  onInvite: (userId: User['id'], user: User) => void
  onCancel: () => void
  users?: User[]
  btnText?: string
  header?: React.ReactNode
}

const ModalInviteUsers = ({
  onInvite,
  onCancel,
  btnText,
  users,
  header,
  ...props
}: Props) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [usersResult, setUsersResult] = React.useState<User[]>([])

  const [invitedIds, setInvitedIds] = React.useState<string[]>([])

  const userList = users || usersResult

  const handleSearchUser = async (text: string) => {
    if (!text || users) return

    const resp = await LifeApi.searchUser(text)
    if (resp.success) {
      setUsersResult(resp.users)
    }
  }

  const handleCancel = () => {
    resetState()
    onCancel()
  }

  const resetState = () => {
    setSearchValue('')
    setUsersResult([])
    setInvitedIds([])
  }

  useEffect(() => {
    searchValue && debouncedSearchUser(searchValue)
  }, [searchValue])

  const debouncedSearchUser = useCallback(debounce(handleSearchUser, 400), [])

  const handleInvite = (userId: User['id'], user: User) => {
    onInvite(userId, user)
    setInvitedIds([...invitedIds, userId])
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  const renderResult = () => {
    const usersToRender = users
      ? users.filter(
          (u) =>
            fuzzySearch(searchValue, u.name) ||
            fuzzySearch(searchValue, u.username) ||
            fuzzySearch(searchValue, u.email)
        )
      : usersResult
    return (
      <div
        className="list-search-users"
        style={{
          minHeight: 200,
          maxHeight: '300px',
          overflow: 'auto',
          marginTop: 8,
          border: `1px solid ${COLORS.dark[5]}`,
          borderRadius: 4,
        }}
      >
        {usersToRender.map((user) => (
          <Flex
            key={user.id}
            justify="space-between"
            className="p8"
            style={{
              backgroundColor: COLORS.dark[9],
              marginBottom: 4,
              marginTop: 2,
              borderRadius: 4,
            }}
          >
            <Flex align="center" gap={8}>
              <UserAvatar user={user} size={24} />
              <div>{user.name || user.username}</div>
            </Flex>
            <Button
              type="primary"
              onClick={() => handleInvite(user.id, user)}
              disabled={invitedIds.includes(user.id)}
            >
              {btnText || 'Invite'}
            </Button>
          </Flex>
        ))}
      </div>
    )
  }

  return (
    <div>
      <Modal footer={null} {...props} onCancel={handleCancel}>
        <div>
          {header}
          <Input
            placeholder="Enter username or email"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          {renderResult()}
        </div>
      </Modal>
    </div>
  )
}

export default ModalInviteUsers

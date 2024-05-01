import { Plus, PlusCircle } from '@phosphor-icons/react'
import { Badge, Button, Flex, Input, Popover } from 'antd'
import LifeApi from 'api/LifeApi'
import UserAvatar from 'common/UserAvatar'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { Project, User } from 'types/global'
import { successNotification } from 'utils'

interface Props {
  currentProject: Project
}

const AddUserButton = ({ currentProject }: Props) => {
  const [usersResult, setUsersResult] = useState<User[]>([])
  const [searchValue, setSearchValue] = useState('')

  const currentProjectUserIds = currentProject.users.map((user) => user.id)

  useEffect(() => {
    debouncedSearchUser(searchValue)
  }, [searchValue])

  const handleSearchUser = async (text: string) => {
    if (!text) return
    const resp = await LifeApi.searchUser(text)
    if (resp.success) {
      setUsersResult(resp.users)
    }
  }

  const debouncedSearchUser = useCallback(debounce(handleSearchUser, 500), [])

  const handleInviteUser = async (userId: string) => {
    const resp = await LifeApi.inviteUserToProject(currentProject.id, userId)

    if (resp.success) {
      successNotification(
        'Invitation sent',
        'User invited successfully. Please wait for the user to accept the invitation.'
      )
    }
  }

  const renderAddUserButton = () => {
    return (
      <Popover
        trigger={['click']}
        placement="bottomLeft"
        content={
          <div>
            <Input
              placeholder="Enter username or email"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="list-search-users">
              {usersResult.map(
                (user) =>
                  !currentProjectUserIds.includes(user.id) && (
                    <Flex
                      key={user.id}
                      align="center"
                      className="user-result-item"
                      justify="space-between"
                    >
                      <Flex align="center" gap={6}>
                        <UserAvatar
                          name={user.username}
                          src={user.avatar_url}
                          size={16}
                          round
                        />
                        <div>{user.username}</div>
                      </Flex>

                      <div
                        className="invite-user-btn"
                        onClick={() => handleInviteUser(user.id)}
                      >
                        <Plus size={12} color="#fff" />
                      </div>
                    </Flex>
                  )
              )}
            </div>
          </div>
        }
      >
        <Button
          type="primary"
          icon={<PlusCircle size={20} />}
          className="add-user-icon"
        />
      </Popover>
    )
  }

  return renderAddUserButton()
}

export default AddUserButton

import {
  House,
  Key,
  Pencil,
  ShieldPlus,
  Trash,
  User,
} from '@phosphor-icons/react'
import { Button, Dropdown, Flex, MenuProps, Modal, Table } from 'antd'
import UserAvatar from 'common/UserAvatar'
import React from 'react'
import { Permissions, Project } from 'types/global'
import { UserProject } from 'types/project'
import { COLORS } from 'utils/css'
import './style.scss'
import LifeApi from 'api/LifeApi'
import { useAppDispatch } from 'hooks'
import { selectProject, updateProjectSuccess } from 'actions/project'
import { errorNotification, successNotification } from 'utils'

interface Props {
  currentProject: Project
}

const PERMISSIONS = [
  {
    value: 'OWNER',
    label: 'Owner',
    icon: <House size={16} />,
  },
  {
    value: 'ADMIN',
    label: 'Admin',
    icon: <Key size={16} />,
  },
  // {
  //   value: 'MODERATOR',
  //   label: 'Moderator',
  //   icon: <ShieldPlus size={16} />,
  // },
  {
    value: 'MEMBER',
    label: 'Member',
    icon: <User size={16} />,
  },
]

const ProjectUsersTable = ({ currentProject }: Props) => {
  const dispatch = useAppDispatch()
  const handleClickChangePermission = (user: UserProject, key: string) => {
    if (key === 'remove') {
      Modal.confirm({
        title: 'Remove user',
        content: 'Are you sure you want to remove this user from the project?',
        onOk: () => handleChangePermission(user, 'remove'),
      })
    } else handleChangePermission(user, key as Permissions)
  }

  const handleChangePermission = async (
    user: UserProject,
    permission: Permissions | 'remove'
  ) => {
    const resp = await LifeApi.updateProjectPermission(currentProject.id, {
      user_id: user.id,
      permission,
    })

    if (resp.success) {
      let currentProjectUsers = currentProject.users

      successNotification('Success', 'Permission updated successfully')

      if (permission === 'remove') {
        currentProjectUsers = currentProjectUsers.filter(
          (u) => u.id !== user.id
        )
      } else {
        currentProjectUsers = currentProjectUsers.map((u) =>
          u.id === user.id ? { ...u, permission } : u
        )
      }

      dispatch(
        updateProjectSuccess({
          project: { ...currentProject, users: currentProjectUsers },
        })
      )
    } else {
      errorNotification('Error', resp.message || 'Failed to update permission')
    }
  }

  const changePermissionItems: MenuProps['items'] = PERMISSIONS.map(
    (permission) => ({
      key: permission.value,
      label: permission.label,
      icon: permission.icon,
      className: `permission-${permission.value}`,
    })
  ).concat([
    {
      key: 'remove',
      label: 'Remove',
      icon: <Trash size={16} color={COLORS.red[6]} />,
      className: 'permission-remove',
    },
  ])

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      with: 300,
      render: (name: string, record: UserProject) => (
        <Flex>
          <Flex align="center" gap={8}>
            <UserAvatar user={record} size={32} />
            <div className="ml-2">{name || record.username}</div>
          </Flex>
          <Dropdown
            trigger={['click']}
            menu={{
              items: changePermissionItems,
              onClick: ({ key }) => handleClickChangePermission(record, key),
            }}
          >
            <div style={{ width: 32, marginLeft: 8 }}>
              <Button
                className="edit-user-project-btn"
                icon={<Pencil size={16} />}
              />
            </div>
          </Dropdown>
        </Flex>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
    },
  ]

  return (
    <Table
      bordered
      columns={columns}
      dataSource={currentProject.users}
      rowKey="id"
      className="users-project-table"
      pagination={false}
    />
  )
}

export default ProjectUsersTable

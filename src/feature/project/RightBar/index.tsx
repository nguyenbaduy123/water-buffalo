import {
  Badge,
  Button,
  Divider,
  Dropdown,
  Flex,
  MenuProps,
  Popover,
  Tooltip,
} from 'antd'
import UserAvatar from 'common/UserAvatar'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { Project } from 'types/global'
import { COLORS } from 'utils/css'
import AddUserButton from './AddUserButton'
import './index.scss'
import { hasAdminPermission } from 'utils/permission'
import PriorityTag from 'components/PriorityTag'
import LifeApi from 'api/LifeApi'
import { updateProjectSuccess } from 'actions/project'
import { PlusCircle } from '@phosphor-icons/react'
import RenderUser from 'common/RenderUser'

interface Props {
  currentProject: Project | null
  currentUserProject: RootState['project']['currentUserProject']
  dispatch: AppDispatch
  currentOrganization: RootState['organization']['currentOrganization']
}

const ProjectRightBar = ({
  currentProject,
  currentUserProject,
  dispatch,
  currentOrganization,
}: Props) => {
  if (!currentProject) return null

  const canManageProject =
    currentUserProject && hasAdminPermission(currentUserProject.permission)

  const handleUpdatePriority = async (priority: number) => {
    const resp = await LifeApi.updatePriorityProject(
      currentProject.id,
      priority
    )
  }

  const handleAssignTeam = async (teamId: string) => {
    const resp = await LifeApi.assignToProject(currentProject.id, {
      team_id: teamId,
    })
    if (resp.success) {
      // dispatch(
      //   updateProjectSuccess({
      //     project: resp.project,
      //   })
      // )
    }
  }

  const handleAssignUser = async (userId: string) => {
    const resp = await LifeApi.assignToProject(currentProject.id, {
      user_id: userId,
    })
    if (resp.success) {
      // dispatch(
      //   updateProjectSuccess({
      //     project: resp.project,
      //   })
      // )
    }
  }

  const renderAddUserButton = () => {
    if (currentProject.is_personal)
      return <AddUserButton currentProject={currentProject} />

    const teams = currentOrganization?.teams || []
    const users = currentOrganization?.users || []

    const items: MenuProps['items'] = teams
      .map((team) => ({
        key: team.id,
        label: <div>{team.name}</div>,
        onClick: () => handleAssignTeam(team.id),
      }))
      .concat(
        // @ts-ignore
        users.map((u) => {
          return {
            key: u.id,
            label: <RenderUser user={u} />,
            onClick: () => handleAssignUser(u.id),
          }
        })
      )

    return (
      <Dropdown
        menu={{
          items: items,
        }}
      >
        <Button
          type="primary"
          icon={<PlusCircle size={20} />}
          className="add-user-icon"
        />
      </Dropdown>
    )
  }

  return (
    <section className="project-right-bar">
      <div className="right-bar-item">
        <Flex
          align="center"
          justify="space-between"
          className="right-bar-title"
        >
          <Flex align="center" gap={12}>
            Users
            <Badge color={COLORS.blue[6]} count={currentProject.users.length} />
          </Flex>

          {canManageProject && renderAddUserButton()}
        </Flex>
        <div className="list-project-users">
          <Flex wrap="wrap" gap={4}>
            {currentProject.users.map((user) => (
              <Tooltip
                key={user.id}
                title={`${user.username} (${user.permission.toLowerCase()})`}
              >
                <div className="project-user">
                  <UserAvatar
                    name={user.username}
                    src={user.avatar_url}
                    size={20}
                    round
                  />
                </div>
              </Tooltip>
            ))}
          </Flex>
        </div>
        <Divider />
        <div className="project-priority">
          <Flex align="center" justify="space-between">
            <div>Priority</div>
            {canManageProject ? (
              <Dropdown
                trigger={['click']}
                menu={{
                  items: [3, 2, 1, 0].map((priority) => ({
                    key: priority,
                    label: <PriorityTag priority={priority} />,
                    onClick: () => handleUpdatePriority(priority),
                  })),
                }}
              >
                <div>
                  <PriorityTag priority={currentProject.priority} />
                </div>
              </Dropdown>
            ) : (
              <PriorityTag priority={currentProject.priority} />
            )}
          </Flex>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentProject: state.project.currentProject,
  currentUserProject: state.project.currentUserProject,
  currentOrganization: state.organization.currentOrganization,
})

export default connect(mapStateToProps)(ProjectRightBar)

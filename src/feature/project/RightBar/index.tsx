import { Badge, Divider, Dropdown, Flex, Popover, Tooltip } from 'antd'
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

interface Props {
  currentProject: Project | null
  currentUserProject: RootState['project']['currentUserProject']
  dispatch: AppDispatch
}

const ProjectRightBar = ({
  currentProject,
  currentUserProject,
  dispatch,
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

          {canManageProject && (
            <AddUserButton currentProject={currentProject} />
          )}
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
})

export default connect(mapStateToProps)(ProjectRightBar)

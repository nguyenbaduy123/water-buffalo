import { Badge, Flex, Tooltip } from 'antd'
import UserAvatar from 'common/UserAvatar'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { Project } from 'types/global'
import { COLORS } from 'utils/css'
import AddUserButton from './AddUserButton'
import './index.scss'

interface Props {
  currentProject: Project | null
}

const ProjectRightBar = ({ currentProject }: Props) => {
  if (!currentProject) return null

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

          <AddUserButton currentProject={currentProject} />
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
      </div>
    </section>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentProject: state.project.currentProject,
})

export default connect(mapStateToProps)(ProjectRightBar)

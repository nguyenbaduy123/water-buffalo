import { AppDispatch, RootState } from 'store'
import { Button, Divider, Dropdown, Flex, MenuProps } from 'antd'
import Router from 'next/router'
import { CaretDown, FolderPlus, Plus } from '@phosphor-icons/react'

import './index.scss'
import CurrentUserAvatar from 'common/CurrentUserAvatar'
import { connectAndMapStateToProps } from 'utils/redux'
import { Project } from 'types/global'
import UserAvatar from 'common/UserAvatar'
import { getProjectUniqueName } from 'utils'
import { selectProject } from 'actions/project'

interface Props {
  auth: RootState['auth']
  project: RootState['project']
  dispatch: AppDispatch
}

const userSelectItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'Create Organization',
    icon: <Plus size={14} />,
    onClick: () => Router.push('/organization/new'),
  },
]

const Sidebar = ({ auth, project, dispatch }: Props) => {
  const handleClickNew = () => {
    Router.push('project/new', '/new')
  }

  const redirectToProject = (project: Project) => {
    dispatch(selectProject({ currentProject: project }))
    Router.push('/project', getProjectUniqueName(project))
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <Dropdown trigger={['click']} menu={{ items: userSelectItems }}>
          <Flex align="center" gap={8} className="current-user">
            <CurrentUserAvatar size={24} textSizeRatio={1.75} />
            <div className="current-user">{auth.username || auth.email}</div>
            <CaretDown size={16} />
          </Flex>
        </Dropdown>
      </div>
      <div className="sidebar-container">
        <div>
          <Flex align="center" justify="space-between">
            <div className="top-projects">Top Projects</div>
            <Button
              type="primary"
              icon={<FolderPlus />}
              onClick={handleClickNew}
            >
              New
            </Button>
          </Flex>
          <Divider />

          <Flex className="list-projects" vertical>
            {project.data.map((project) => (
              <div
                key={project.id}
                className="project-item"
                onClick={() => redirectToProject(project)}
              >
                <Flex className="project-name" gap={6}>
                  <UserAvatar
                    name={project.owner.username}
                    src={project.owner.avatar_url}
                    size={16}
                    textSizeRatio={1.5}
                    round
                  />
                  <div className="project-unique-name">
                    {getProjectUniqueName(project)}
                  </div>
                </Flex>
              </div>
            ))}
          </Flex>
        </div>
      </div>
    </aside>
  )
}

export default connectAndMapStateToProps(['auth', 'project'])(Sidebar)

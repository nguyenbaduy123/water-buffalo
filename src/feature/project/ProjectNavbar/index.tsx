import { Checks, Gear, LightbulbFilament } from '@phosphor-icons/react'
import { Badge, Flex } from 'antd'
import Router from 'next/router'
import { getProjectRoute } from 'utils'
import { Project } from 'types/global'
import { ProjectTabs } from './ProjectNavbar'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { ADMIN, MEMBER, checkHasPermission } from 'utils/permission'

const NAVBAR_ITEMS = [
  {
    id: 'project',
    title: 'Projects',
    href: '/',
    icon: <LightbulbFilament size={16} />,
    permission: MEMBER,
  },
  {
    id: 'issues',
    title: 'Issues',
    href: '/issues',
    icon: <Checks size={16} />,
    permission: MEMBER,
  },
  {
    id: 'settings',
    title: 'Settings',
    href: '/settings/general',
    icon: <Gear size={16} />,
    permission: ADMIN,
  },
]

interface Props {
  currentTabId: ProjectTabs
  currentProject: Project | null
  auth: RootState['auth']
}

const ProjectNavbar = ({ currentTabId, currentProject, auth }: Props) => {
  const currentUserProject = currentProject?.users.find(
    (user) => user.id === auth.userId
  )

  const handleClickNavbarItem = (item: (typeof NAVBAR_ITEMS)[number]) => {
    if (item.id === currentTabId) return

    Router.push(
      `/project${item.href}`,
      getProjectRoute(currentProject, item.href)
    )
  }
  return (
    <div className="project-navbar-container">
      <Flex gap={12}>
        {NAVBAR_ITEMS.map(
          (item) =>
            checkHasPermission(
              item.permission,
              currentUserProject?.permission
            ) && (
              <div
                key={item.id}
                className={`project-navbar-item ${
                  currentTabId === item.id ? 'active' : ''
                }`}
                onClick={() => handleClickNavbarItem(item)}
              >
                <Flex align="center" gap={4}>
                  <div className="project-navbar-icon">{item.icon}</div>
                  <div className="project-navbar-title">{item.title}</div>
                  {item.id == 'issues' && (
                    <div>
                      <Badge
                        size="small"
                        color="yellow"
                        count={currentProject?.issue_open_count}
                        showZero
                      />
                    </div>
                  )}
                </Flex>
              </div>
            )
        )}
      </Flex>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(ProjectNavbar)

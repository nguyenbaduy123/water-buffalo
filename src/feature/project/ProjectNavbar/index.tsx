import { Checks, Gear, LightbulbFilament } from '@phosphor-icons/react'
import { Badge, Flex } from 'antd'
import Router from 'next/router'
import { getProjectUniqueName } from 'utils'
import { Project } from 'types/global'
import { ProjectTabs } from './ProjectNavbar'

const NAVBAR_ITEMS = [
  {
    id: 'project',
    title: 'Projects',
    href: '/',
    icon: <LightbulbFilament size={16} />,
  },
  {
    id: 'issues',
    title: 'Issues',
    href: '/issues',
    icon: <Checks size={16} />,
  },
  {
    id: 'settings',
    title: 'Settings',
    href: '/settings',
    icon: <Gear size={16} />,
  },
]

interface Props {
  currentTabId: ProjectTabs
  currentProject: Project | null
}

const ProjectNavbar = ({ currentTabId, currentProject }: Props) => {
  const handleClickNavbarItem = (item: (typeof NAVBAR_ITEMS)[number]) => {
    if (item.id === currentTabId) return

    Router.push(
      `/project${item.href}`,
      `/${getProjectUniqueName(currentProject)}${item.href}`
    )
  }
  return (
    <div className="project-navbar-container">
      <Flex gap={12}>
        {NAVBAR_ITEMS.map((item) => (
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
                    color="yellow"
                    count={currentProject?.issue_count}
                    showZero
                  />
                </div>
              )}
            </Flex>
          </div>
        ))}
      </Flex>
    </div>
  )
}

export default ProjectNavbar

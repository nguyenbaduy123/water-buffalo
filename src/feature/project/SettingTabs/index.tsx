import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { getProjectRoute } from 'utils'

const TABS = [
  {
    id: 'general',
    label: 'General',
    href: '/general',
  },
  {
    id: 'members',
    label: 'Members',
    href: '/members',
  },
  {
    id: 'tags',
    label: 'Tags',
    href: '/tags',
  },
]

interface Props {
  currentTabId: string
  currentProject: RootState['project']['currentProject']
}

const SettingTabs = ({ currentTabId, currentProject }: Props) => {
  return (
    <div className="project-settings-tabs">
      {TABS.map((tab) => (
        <div
          key={tab.id}
          className={`project-settings-tab ${
            currentTabId == tab.id ? 'current-tab' : ''
          }`}
          onClick={() => {
            Router.push(
              `/project/settings/${tab.id}`,
              getProjectRoute(currentProject, tab.href)
            )
          }}
        >
          {tab.label}
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(SettingTabs)

import { current } from '@reduxjs/toolkit'
import SettingTabs from 'feature/project/SettingTabs'
import ProjectLayout from 'layouts/ProjectLayout'
import React from 'react'
import { ProviderProps } from 'types/global'

interface Props extends ProviderProps {
  currentTabId: string
}

const SettingLayout = ({ currentTabId, children }: Props) => {
  return (
    <ProjectLayout currentTabId="settings">
      <div className="settings-layout">
        <SettingTabs currentTabId={currentTabId} />
        <div className="project-setting-container">{children}</div>
      </div>
    </ProjectLayout>
  )
}

export default SettingLayout

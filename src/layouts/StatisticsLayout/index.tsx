import { current } from '@reduxjs/toolkit'
import SettingTabs from 'feature/project/SettingTabs'
import StatisticTabs from 'feature/project/StatisticTabs'
import ProjectLayout from 'layouts/ProjectLayout'
import React from 'react'
import { ProviderProps } from 'types/global'

interface Props extends ProviderProps {
  currentTabId: string
}

const StatisticsLayout = ({ children, currentTabId }: Props) => {
  return (
    <ProjectLayout currentTabId="statistics">
      <div className="statistics-layout">
        <StatisticTabs currentTabId={currentTabId} />
        <div className="project-statistics-container">{children}</div>
      </div>
    </ProjectLayout>
  )
}

export default StatisticsLayout

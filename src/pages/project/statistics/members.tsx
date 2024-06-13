import withAuth from 'hocs/withAuth'
import StatisticsLayout from 'layouts/StatisticsLayout'
import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'

interface Props {}

const ProjectMemberStatistic: NextPage<Props> = () => {
  return (
    <StatisticsLayout currentTabId="members">
      Project Statistics
    </StatisticsLayout>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(withAuth(ProjectMemberStatistic))

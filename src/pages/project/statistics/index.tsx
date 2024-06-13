import withAuth from 'hocs/withAuth'
import StatisticsLayout from 'layouts/StatisticsLayout'
import { NextPage } from 'next'
import Router from 'next/router'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { getProjectUniqueName } from 'utils'

interface Props {
  currentProject: RootState['project']['currentProject']
}

const StatisticsPage: NextPage<Props> = ({ currentProject }) => {
  useEffect(() => {
    Router.push(
      `/project/statistics/project`,
      `/${getProjectUniqueName(currentProject)}/statistics/project`
    )
  }, [])

  return null
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(withAuth(StatisticsPage))

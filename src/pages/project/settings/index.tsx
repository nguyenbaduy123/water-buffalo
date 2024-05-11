import withAuth from 'hocs/withAuth'
import { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { getProjectUniqueName } from 'utils'

interface Props {
  currentProject: RootState['project']['currentProject']
}

const ProjectSettings: NextPage<Props> = ({ currentProject }) => {
  useEffect(() => {
    Router.push(
      `/project/settings/general`,
      `/${getProjectUniqueName(currentProject)}/settings/general`
    )
  }, [])

  return null
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(withAuth(ProjectSettings))

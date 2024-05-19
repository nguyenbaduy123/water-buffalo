import ProjectUsersTable from 'feature/project/UsersTable'
import SettingLayout from 'layouts/SettingLayout'
import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'

interface Props {
  currentProject: RootState['project']['currentProject']
}

const SettingMember: NextPage<Props> = ({ currentProject }) => {
  return (
    <SettingLayout currentTabId="members">
      {currentProject && <ProjectUsersTable currentProject={currentProject} />}
    </SettingLayout>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(SettingMember)

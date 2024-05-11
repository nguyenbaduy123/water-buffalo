import SettingLayout from 'layouts/SettingLayout'
import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'

interface Props {
  currentProject: RootState['project']['currentProject']
}

const SettingGeneral: NextPage<Props> = () => {
  return <SettingLayout currentTabId="general">Tags</SettingLayout>
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(SettingGeneral)

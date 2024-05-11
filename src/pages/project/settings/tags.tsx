import SettingLayout from 'layouts/SettingLayout'
import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'

interface Props {
  currentProject: RootState['project']['currentProject']
}

const SettingTags: NextPage<Props> = () => {
  return <SettingLayout currentTabId="tags">Tags</SettingLayout>
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(SettingTags)

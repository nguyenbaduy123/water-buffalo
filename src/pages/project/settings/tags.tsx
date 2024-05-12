import { Button, Flex } from 'antd'
import SearchInput from 'common/SearchInput'
import ModalAddTag from 'feature/project/ModalAddTag'
import TagsTable from 'feature/project/TagsTable'
import withAuth from 'hocs/withAuth'
import SettingLayout from 'layouts/SettingLayout'
import { NextPage } from 'next'
import React from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'

interface Props {
  currentProject: RootState['project']['currentProject']
  dispatch: AppDispatch
}

const SettingTags: NextPage<Props> = ({ currentProject, dispatch }: Props) => {
  return (
    <SettingLayout currentTabId="tags">
      <div>
        <div className="tags-table">
          <TagsTable currentProject={currentProject} dispatch={dispatch} />
        </div>
      </div>
    </SettingLayout>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(withAuth(SettingTags))

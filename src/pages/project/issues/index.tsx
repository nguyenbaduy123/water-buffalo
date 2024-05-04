import { MagnifyingGlass } from '@phosphor-icons/react'
import { loadIssues } from 'actions/issue'
import { Button, Flex, Input, Space } from 'antd'
import IssueTable from 'feature/issues/IssuesTable'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { IssueStatus } from 'types/project'
import { getProjectUniqueName } from 'utils'

interface Props {
  auth: RootState['auth']
  issues: RootState['issue']
  currentProject: RootState['project']['currentProject']
  dispatch: AppDispatch
}

const Issues = ({ auth, issues, dispatch, currentProject }: Props) => {
  const [status, setStatus] = useState<IssueStatus>('open')

  const onChangeStatus = (status: IssueStatus) => {
    setStatus(status)
  }

  useEffect(() => {
    dispatch(loadIssues({ status }))
  }, [currentProject, status])

  const redirectToNewIssuePage = () => {
    Router.push(
      '/project/issues/new',
      `/${getProjectUniqueName(currentProject)}/issues/new`
    )
  }

  return (
    <ProjectLayout currentTabId="issues">
      <div className="issue-page-container">
        <Flex justify="space-between" className="issue-page-header">
          <Space.Compact>
            <Input addonBefore={<MagnifyingGlass />} placeholder="large size" />
          </Space.Compact>
          <Flex className="issue-page-header-tail">
            <Button type="primary" onClick={redirectToNewIssuePage}>
              New Issue
            </Button>
          </Flex>
        </Flex>

        <div className="issue-table-container">
          <IssueTable status={status} onChangeStatus={onChangeStatus} />
        </div>
      </div>
    </ProjectLayout>
  )
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  issues: state.issue,
  currentProject: state.project.currentProject,
})

export default connect(mapStateToProps)(withAuth(Issues))

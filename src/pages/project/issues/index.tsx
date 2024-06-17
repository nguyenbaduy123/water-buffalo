import { MagnifyingGlass } from '@phosphor-icons/react'
import { loadIssues, searchIssues } from 'actions/issue'
import { Button, Flex, Input, Select, Space } from 'antd'
import { SearchIssueParams } from 'api/LifeApi.d'
import UserAvatar from 'common/UserAvatar'
import RenderTag from 'components/RenderTag'
import IssueTable from 'feature/issues/IssuesTable'
import withAuth from 'hocs/withAuth'
import ProjectLayout from 'layouts/ProjectLayout'
import { debounce } from 'lodash'
import Router from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { IssueStatus } from 'types/project'
import { getProjectUniqueName } from 'utils'
import { hasAdminPermission } from 'utils/permission'

interface Props {
  auth: RootState['auth']
  issues: RootState['issue']
  currentProject: RootState['project']['currentProject']
  dispatch: AppDispatch
  currentUserProject: RootState['project']['currentUserProject']
}

const Issues = ({
  auth,
  issues,
  dispatch,
  currentProject,
  currentUserProject,
}: Props) => {
  const [status, setStatus] = useState<IssueStatus>('open')
  const [searchIssue, setSearchIssue] = useState('')
  const [searchByAssignee, setSearchByAssignee] = useState('')
  const [searchByTags, setSearchByTags] = useState<number[]>([])

  const isAdmin = hasAdminPermission(currentUserProject?.permission)

  const onChangeStatus = (status: string) => {
    // @ts-ignore
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

  const debouncedSearchIssue = useCallback(
    debounce((params: SearchIssueParams) => {
      handleSearchIssue(params)
    }, 500),
    []
  )

  const handleSearchIssue = async (params: SearchIssueParams) => {
    dispatch(searchIssues(params))
  }

  const handleChangeInput = (value: string) => {
    setSearchIssue(value)
    debouncedSearchIssue({
      status,
      keyword: value,
      tag_ids: searchByTags,
      assignee_id: searchByAssignee,
    })
  }

  const handleChangeTags = (value: number[]) => {
    setSearchByTags(value)
    debouncedSearchIssue({
      status,
      tag_ids: value,
      assignee_id: searchByAssignee,
      keyword: searchIssue,
    })
  }

  const handleChangeAssignee = (value: string) => {
    setSearchByAssignee(value)
    debouncedSearchIssue({
      status,
      assignee_id: value,
      tag_ids: searchByTags,
      keyword: searchIssue,
    })
  }

  return (
    <ProjectLayout currentTabId="issues">
      <div className="issue-page-container">
        <Flex justify="space-between" className="issue-page-header">
          <Flex gap={12}>
            <Space.Compact>
              <Input
                addonBefore={<MagnifyingGlass />}
                placeholder="Type to search"
                value={searchIssue}
                onChange={(e) => handleChangeInput(e.target.value)}
              />
            </Space.Compact>
            <Select
              className="mnw200px"
              placeholder="Filter by assignee"
              value={searchByAssignee}
              onChange={handleChangeAssignee}
              allowClear
              options={currentProject?.users.map((user) => ({
                value: user.id,
                label: (
                  <Flex gap={8} align="center">
                    <UserAvatar user={user} size={24} />
                    {user.name || user.username}
                  </Flex>
                ),
              }))}
            />

            <Select
              mode="tags"
              className="mnw200px"
              placeholder="Filter by tag"
              value={searchByTags}
              onChange={handleChangeTags}
              options={currentProject?.settings.tags.map((tag) => ({
                value: tag.id,
                label: <RenderTag tag={tag} />,
              }))}
            />
          </Flex>
          <Flex className="issue-page-header-tail">
            {isAdmin && (
              <Button type="primary" onClick={redirectToNewIssuePage}>
                New Issue
              </Button>
            )}
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
  currentUserProject: state.project.currentUserProject,
})

export default connect(mapStateToProps)(withAuth(Issues))

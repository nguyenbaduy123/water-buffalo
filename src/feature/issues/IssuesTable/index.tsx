import { CheckCircle, DotsThreeCircle, XCircle } from '@phosphor-icons/react'
import { loadMoreIssues } from 'actions/issue'
import { Flex, Table } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { Issue } from 'types/project'
import { COLORS } from 'utils/css'

const statusToIcon = {
  open: <DotsThreeCircle size={24} color={COLORS.green[6]} />,
  closed: <XCircle size={24} color={COLORS.purple[6]} />,
  completed: <CheckCircle size={24} color={COLORS.green[6]} />,
}

interface Props {
  issue: RootState['issue']
  currentProject: RootState['project']['currentProject']
  dispatch: AppDispatch
}

const IssueTable = ({ issue, currentProject, dispatch }: Props) => {
  if (!currentProject) return null

  const loadMore = () => {
    dispatch(loadMoreIssues())
  }

  const columns = [
    {
      title: (
        <Flex gap={8}>
          <Flex>{currentProject.issue_open_count} Open</Flex>
          <Flex>{currentProject.issue_closed_count} Closed</Flex>
          <Flex>{currentProject.issue_completed_count} Completed</Flex>
        </Flex>
      ),
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Issue) => (
        <Flex gap={8}>
          <Flex>{statusToIcon[record.status]}</Flex>
          <Flex>{title}</Flex>
        </Flex>
      ),
    },
  ]

  const rowSelection = {}
  return (
    <Table
      dataSource={issue.data}
      rowSelection={rowSelection}
      columns={columns}
      loading={issue.fetching}
      pagination={{
        pageSize: 10,
        total:
          currentProject.issue_open_count +
          currentProject.issue_closed_count +
          currentProject.issue_completed_count,
      }}
      onChange={loadMore}
      scroll={{ y: 400 }}
    />
  )
}

const mapStateToProps = (state: RootState) => ({
  issue: state.issue,
  currentProject: state.project.currentProject,
})

export default connect(mapStateToProps)(IssueTable)

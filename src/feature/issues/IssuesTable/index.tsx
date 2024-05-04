import { CheckCircle, DotsThreeCircle, XCircle } from '@phosphor-icons/react'
import { loadMoreIssues } from 'actions/issue'
import { Flex, Table } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { Issue } from 'types/project'
import { fromNow, getProjectUniqueName } from 'utils'
import { COLORS } from 'utils/css'

import './index.scss'
import Router from 'next/router'

const statusToIcon = {
  open: <DotsThreeCircle size={24} color={COLORS.green[6]} />,
  closed: <XCircle size={24} color={COLORS.purple[6]} />,
  completed: <CheckCircle size={24} color={COLORS.green[6]} />,
}

const STATUSES_FILTER: { label: string; value: Issue['status'] }[] = [
  {
    label: 'Open',
    value: 'open',
  },
  {
    label: 'Closed',
    value: 'closed',
  },
  {
    label: 'Completed',
    value: 'completed',
  },
]

interface Props {
  issue: RootState['issue']
  currentProject: RootState['project']['currentProject']
  dispatch: AppDispatch
  status: Issue['status']
  onChangeStatus: (status: Issue['status']) => void
}

const IssueTable = ({
  issue,
  currentProject,
  dispatch,
  status,
  onChangeStatus,
}: Props) => {
  if (!currentProject) return null

  const loadMore = () => {
    dispatch(loadMoreIssues({ status }))
  }

  const handleClickIssue = (issueId: number) => {
    Router.push(
      `/project/issues/issue?issue_id=${issueId}`,
      `/${getProjectUniqueName(currentProject)}/issues/${issueId}`
    )
  }

  const columns = [
    {
      title: (
        <Flex gap={12}>
          {STATUSES_FILTER.map((filter) => (
            <Flex
              key={filter.value}
              className={`status-filter ${
                status == filter.value ? 'current-status' : ''
              }`}
              onClick={() => onChangeStatus(filter.value)}
            >
              {filter.label}
            </Flex>
          ))}
        </Flex>
      ),
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Issue) => (
        <Flex gap={8}>
          <Flex>{statusToIcon[record.status]}</Flex>
          <Flex vertical>
            <div
              className="issue-title"
              onClick={() => handleClickIssue(record.id)}
            >
              {title}
            </div>
            <div className="issue-inserted-from-now">{`Opened ${fromNow(
              record.inserted_at
            )}`}</div>
          </Flex>
        </Flex>
      ),
    },
  ]

  const rowSelection = {}
  return (
    <Table
      className="issue-table"
      dataSource={issue.data}
      rowKey={(record) => record.id}
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

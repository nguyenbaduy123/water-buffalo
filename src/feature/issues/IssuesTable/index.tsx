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
import PriorityTag from 'components/PriorityTag'
import RenderTag from 'components/RenderTag'

export const statusToIcon = {
  open: <DotsThreeCircle size={24} color={COLORS.green[6]} />,
  not_planned: <XCircle size={24} color={COLORS.gray[6]} />,
  completed: <CheckCircle size={24} color={COLORS.green[6]} />,
}

const STATUSES_FILTER: { label: string; value: string }[] = [
  {
    label: 'Open',
    value: 'open',
  },
  {
    label: 'Closed',
    value: 'closed',
  },
]

interface Props {
  issue: RootState['issue']
  currentProject: RootState['project']['currentProject']
  dispatch: AppDispatch
  status: string
  onChangeStatus: (status: string) => void
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

  const getTotalCount = () => {
    switch (status) {
      case 'open':
        return currentProject.issue_open_count
      case 'closed':
        return currentProject.issue_count - currentProject.issue_open_count
    }
  }

  const columns = [
    {
      title: (
        <Flex gap={24}>
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
            <Flex
              className="issue-title"
              gap={16}
              onClick={() => handleClickIssue(record.id)}
            >
              <div className="issue-title-text">{title}</div>
              <Flex>
                {!!record.priority && (
                  <div className="priority mr12">
                    <PriorityTag priority={record.priority} />
                  </div>
                )}

                <Flex gap={6} align="center">
                  {record.tag_ids.map((tagId) => {
                    const tag = currentProject.settings.tags.find(
                      (tag) => tag.id == tagId
                    )
                    return tag ? <RenderTag key={tag.id} tag={tag} /> : null
                  })}
                </Flex>
              </Flex>
            </Flex>
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
      bordered
      className="issue-table"
      dataSource={issue.data}
      rowKey={(record) => record.id}
      rowSelection={rowSelection}
      columns={columns}
      loading={issue.fetching}
      pagination={{
        pageSize: 10,
        total: getTotalCount(),
      }}
      onChange={loadMore}
      scroll={{ y: 500 }}
    />
  )
}

const mapStateToProps = (state: RootState) => ({
  issue: state.issue,
  currentProject: state.project.currentProject,
})

export default connect(mapStateToProps)(IssueTable)

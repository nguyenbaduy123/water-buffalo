import { Table } from 'antd'
import RenderUser from 'common/RenderUser'
import { title } from 'process'
import React from 'react'
import { RootState } from 'store'
import { MemberStatistics } from 'types/project'

interface Props {
  currentProject: RootState['project']['currentProject']
  statistics: MemberStatistics | null
}

const TableMemberStatistics: React.FC<Props> = ({
  currentProject,
  statistics,
}) => {
  const users = currentProject?.users || []

  const columns = [
    {
      title: 'Member',
      dataIndex: 'user_id',
      align: 'center',
      key: 'user_id',
      render: (user_id: string) => {
        const user = users.find((u) => u.id === user_id)
        return user && <RenderUser user={user} />
      },
    },
    {
      title: 'Issue',
      children: [
        {
          title: 'Total',
          dataIndex: 'issue_count',
          key: 'issue_count',
          align: 'center',
        },
        {
          title: 'Open',
          dataIndex: 'issue_open_count',
          key: 'issue_open_count',
          align: 'center',
        },
        {
          title: ' Completed',
          dataIndex: 'issue_completed_count',
          key: 'issue_completed_count',
          align: 'center',
        },
        {
          title: 'Total Score',
          dataIndex: 'issue_total_score',
          key: 'issue_total_score',
          align: 'center',
        },
      ],
    },
    {
      title: 'Task',
      children: [
        {
          title: 'Total',
          dataIndex: 'task_count',
          key: 'task_count',
          align: 'center',
        },
        {
          title: 'Completed',
          dataIndex: 'task_completed_count',
          key: 'task_completed_count',
          align: 'center',
        },
        {
          title: 'Total Score',
          dataIndex: 'task_total_score',
          key: 'task_total_score',
          align: 'center',
        },
      ],
    },

    {
      title: 'Evaluation',
      dataIndex: 'evaluation',
      key: 'evaluation',
      align: 'center',
    },
  ]
  return (
    <Table
      bordered
      // @ts-ignore
      columns={columns}
      dataSource={statistics?.map((s) => ({
        ...s,
        key: s.user_id,
      }))}
      rowKey="user_id"
      pagination={false}
    />
  )
}

export default TableMemberStatistics

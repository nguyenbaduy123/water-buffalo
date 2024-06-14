// import React from 'react';
// import { Space, Table, Tag } from 'antd';

// const { Column, ColumnGroup } = Table;
// import { ProjectStatistics } from 'types/project'

// interface Props {
//   statistic: ProjectStatistics
// }

// const StatisticTable: React.FC<Props> = ({ statistic }) => {
//   // issue_count: number
//   // issue_open_count: number
//   // issue_completed_count: number
//   // issue_not_planned_count: number
//   // task_count: number
//   // task_completed_count: number
//   // task_total_score: number
//   // issue_total_score: number
//   // project_progress: number
//   // project_evaluation: number
//   const columns = [
//     {
//       title: 'Issue'
//     }
//   ]

//   return <Table dataSource={statistic}>
//   <ColumnGroup title="Name">
//     <Column title="First Name" dataIndex="firstName" key="firstName" />
//     <Column title="Last Name" dataIndex="lastName" key="lastName" />
//   </ColumnGroup>
//   <Column title="Age" dataIndex="age" key="age" />
//   <Column title="Address" dataIndex="address" key="address" />
//   <Column
//     title="Tags"
//     dataIndex="tags"
//     key="tags"
//     render={(tags: string[]) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     )}
//   />
// }

// export default StatisticTable

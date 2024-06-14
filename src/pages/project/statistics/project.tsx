import { Card, Col, Row } from 'antd'
import LifeApi from 'api/LifeApi'
import withAuth from 'hocs/withAuth'
import StatisticsLayout from 'layouts/StatisticsLayout'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { ProjectStatistics } from 'types/project'
import { notificationError } from 'utils'
import ReactHighcharts from 'react-highcharts'

interface Props {
  currentProject: RootState['project']['currentProject']
}

const ProjectStatistic: NextPage<Props> = ({ currentProject }) => {
  const [statistics, setStatistics] = React.useState<ProjectStatistics | null>(
    null
  )

  useEffect(() => {
    getProjectStatistics()
  }, [currentProject?.id])

  const getProjectStatistics = async () => {
    if (!currentProject) return
    const resp = await LifeApi.getProjectStatistics(currentProject.id)

    if (resp.success) {
      setStatistics(resp.statistic)
    } else {
      notificationError(resp.message || 'Failed to get project statistics')
    }
  }

  const renderChartTask = () => {
    if (!statistics) return

    // const dataTask =
  }

  // issue_count: number
  // issue_open_count: number
  // issue_completed_count: number
  // issue_not_planned_count: number
  // issue_total_score: number
  // task_count: number
  // task_completed_count: number
  // task_total_score: number
  // project_progress: number
  // project_evaluation: number

  const renderChartIssue = () => {
    if (!statistics) return

    const dataIssue = [
      ['Open', statistics.issue_open_count],
      ['Completed', statistics.issue_completed_count],
      ['Not Planned', statistics.issue_not_planned_count],
    ]

    return (
      <ReactHighcharts
        config={{
          title: {
            text: '<div style="color: #fff">Issue</div>',
            align: 'left',
            useHTML: true,
          },
          subtitle: {
            useHTML: true,
            text: `<div style="font-size: 80px; margin-top: -60px;">${statistics.issue_count}</div>`,
            floating: true,
            verticalAlign: 'middle',
            y: 30,
          },
          credits: {
            enabled: false,
          },
          legend: {
            enabled: true,
          },
          chart: {
            backgroundColor: 'transparent',
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              // @ts-ignore
              innerSize: '80%',
              legend: {
                enabled: true,
              },
              dataLabels: {
                enabled: false,
                crop: false,
                style: {
                  fontSize: '16x',
                },
              },
            },
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
              },
              showInLegend: true,
            },
          },
          colors: ['#52c41a', '#722ed1', '#ced4da', '#B8E8FC', '#BCE29E'],
          series: [
            {
              type: 'pie',
              name: 'Count',
              data: dataIssue,
            },
          ],
        }}
      />
    )
  }

  return (
    <StatisticsLayout currentTabId="project">
      <Row gutter={24}>
        <Col span={12}>
          <Card>{renderChartIssue()}</Card>
        </Col>
        <Col span={12}>
          <Card>{renderChartIssue()}</Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>{/* <Card>{renderChartIssue()}</Card> */}</Col>
      </Row>
    </StatisticsLayout>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProject: state.project.currentProject,
  }
}

export default connect(mapStateToProps)(withAuth(ProjectStatistic))

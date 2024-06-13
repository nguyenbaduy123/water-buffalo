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
import { SeriesOptions } from 'highcharts'

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

  const renderChartIssue = () => {
    if (!statistics) return

    const dataIssue = [
      ['Open', statistics.issue_open_count],
      ['Completed', statistics.issue_completed_count],
      ['Not Planned', statistics.issue_not_planned_count],
      // {
      //   name: 'Open',
      //   yAxis: statistics.issue_open_count,
      //   type: 'pie',
      // },
      // {
      //   name: 'Completed',
      //   yAxis: statistics.issue_closed_count,
      //   type: 'pie',
      // },
      // {
      //   name: 'Not Planned',
      //   yAxis: statistics.issue_closed_count,
      //   type: 'pie',
      // },
    ]

    return (
      <ReactHighcharts
        config={{
          title: {
            text: 'Issue',
            align: 'center',
          },
          subtitle: {
            useHTML: true,
            text: `<div style="font-size: 80px; margin-top: -44px;">${statistics.issue_count}</div>`,
            floating: true,
            verticalAlign: 'middle',
            y: 30,
          },
          credits: {
            enabled: false,
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
                  fontSize: '14x',
                },
              },
            },
          },
          colors: ['#52c41a', '#722ed1', '#ced4da', '#B8E8FC', '#BCE29E'],
          series: [
            {
              type: 'pie',
              name: '123',
              data: dataIssue,
            },
          ],
        }}
      />
    )
  }

  return (
    <StatisticsLayout currentTabId="project">
      <Row>
        <Col span={12}>
          <Card title="Project statistics">{renderChartIssue()}</Card>
        </Col>
        <Col span={12}></Col>
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

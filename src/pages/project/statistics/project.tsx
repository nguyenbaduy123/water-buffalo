import { Card, Col, Row } from 'antd'
import LifeApi from 'api/LifeApi'
import withAuth from 'hocs/withAuth'
import StatisticsLayout from 'layouts/StatisticsLayout'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { IssueStatistic, ProjectStatistics } from 'types/project'
import { notificationError } from 'utils'
import ReactHighcharts from 'react-highcharts'
import { COLORS } from 'utils/css'

interface Props {
  currentProject: RootState['project']['currentProject']
}

const ProjectStatistic: NextPage<Props> = ({ currentProject }) => {
  const [issueStatistics, setIssueStatistics] = React.useState<
    IssueStatistic[]
  >([])
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
      setIssueStatistics(resp.issue_statistic)
    } else {
      notificationError(resp.message || 'Failed to get project statistics')
    }
  }

  const renderChartProgress = () => {
    return (
      // @ts-ignore
      <ReactHighcharts
        config={{
          chart: {
            type: 'column',
            backgroundColor: 'transparent',
          },
          title: {
            text: '<div style="color: #fff">Progress</div>',
            align: 'left',
            useHTML: true,
          },
          legend: {
            enabled: false,
          },
          subtitle: {
            enabled: false,
          },
          credits: {
            enabled: false,
          },
          xAxis: {
            categories: issueStatistics.map((i) => i.date),
            crosshair: true,
            accessibility: {
              description: 'Countries',
            },
          },
          yAxis: {
            min: 0,
            max: 100,
            title: {
              enabled: false,
            },
          },
          tooltip: {},
          plotOptions: {
            column: {
              pointPadding: 0.1,
              borderWidth: 0,
            },
          },
          series: [
            {
              name: 'Progress',
              type: 'column',
              zIndex: 0,
              data: issueStatistics.map(
                (i) =>
                  Math.round(
                    (i.issue_completed_count /
                      (i.issue_count - i.issue_not_planned_count)) *
                      10000
                  ) / 100
              ),
            },
          ],
        }}
      />
    )
  }

  const renderChartIssueStatistic = () => {
    if (!issueStatistics) return

    return (
      // @ts-ignore
      <ReactHighcharts
        config={{
          chart: {
            type: 'line',
            backgroundColor: 'transparent',
          },
          title: {
            text: '<div style="color: #fff">Statistics</div>',
            align: 'left',
            useHTML: true,
          },
          subtitle: {
            enabled: false,
          },
          credits: {
            enabled: false,
          },
          xAxis: {
            categories: issueStatistics.map((i) => i.date),
            crosshair: true,
            accessibility: {
              description: 'Countries',
            },
          },
          yAxis: {
            min: 0,
            title: {
              enabled: false,
            },
          },
          tooltip: {},
          plotOptions: {
            column: {
              pointPadding: 0.1,
              borderWidth: 0,
            },
          },
          series: [
            {
              name: 'Open',
              data: issueStatistics.map((i) => i.issue_open_count),
              color: COLORS.green[6],
            },
            {
              name: 'Close',
              data: issueStatistics.map((i) => i.issue_completed_count),
              color: COLORS.purple[4],
            },
          ],
        }}
      />
    )
  }

  const renderChartTask = () => {
    if (!statistics) return

    const dataTask = [
      ['A', statistics.task_a_count],
      ['B', statistics.task_b_count],
      ['C', statistics.task_c_count],
      ['Rejected', statistics.task_d_count],
      [
        'Not Evaluated',
        statistics.task_completed_count -
          (statistics.task_a_count +
            statistics.task_b_count +
            statistics.task_c_count),
      ],
    ]

    return (
      <ReactHighcharts
        config={{
          title: {
            text: '<div style="color: #fff">Task</div>',
            align: 'left',
            useHTML: true,
          },
          subtitle: {
            useHTML: true,
            text: `<div style="margin-top: -60px; color: #fff;">
            <div style="font-size: 40px";>
              Total: ${statistics.task_count}</div>
            </div>
            <div style="font-size: 24px">
              Completed: ${statistics.task_completed_count}
            </div>
            `,
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
          colors: [
            COLORS.green[6],
            COLORS.green[4],
            COLORS.yellow[6],
            COLORS.red[4],
            COLORS.purple[4],
          ],
          series: [
            {
              type: 'pie',
              name: 'Count',
              data: dataTask,
            },
          ],
        }}
      />
    )
  }

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
            text: `<div style="font-size: 80px;  color: #fff; margin-top: -60px;">${statistics.issue_count}</div>`,
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
          <Card>{renderChartTask()}</Card>
        </Col>
      </Row>
      <Row className="mt24">
        <Col span={24}>
          <Card>{renderChartIssueStatistic()}</Card>
        </Col>
      </Row>
      <Row className="mt24">
        <Col span={24}>
          <Card>{renderChartProgress()}</Card>
        </Col>
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

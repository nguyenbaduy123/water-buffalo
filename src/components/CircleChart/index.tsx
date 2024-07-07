import { SeriesPieOptions } from 'highcharts'
import React from 'react'
import ReactHighcharts from 'react-highcharts'
import { COLORS } from 'utils/css'

interface Props {
  data: SeriesPieOptions['data']
  subTitle?: string
}

const CircleChart: React.FC<Props> = ({ data, subTitle }) => {
  return (
    // @ts-ignore
    <ReactHighcharts
      config={{
        title: {
          text: '<div style="color: #fff;display:none;">Task</div>',
          align: 'left',
          useHTML: true,
        },
        subtitle: {
          useHTML: true,
          text: subTitle && `<div style="color: #fff">${subTitle}</div>`,
          // text: `<div style="margin-top: -60px; color: #fff;">
          //   <div style="font-size: 40px";>
          //     Total: ${statistics.task_count}</div>
          //   </div>
          //   <div style="font-size: 24px">
          //     Completed: ${statistics.task_completed_count}
          //   </div>
          //   `,
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
          height: 240,
        },

        plotOptions: {
          series: {
            borderWidth: 0,
            // @ts-ignore
            innerSize: '80%',

            dataLabels: {
              enabled: false,
              inside: true,
              format: '{point.y:.2f} %',
            },
          },
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              inside: true,
              format: '{point.name}: {point.value:.2f} %',
            },
          },
        },
        colors: [
          COLORS.green[6],
          COLORS.gray[4],
          COLORS.yellow[6],
          COLORS.red[4],
          COLORS.purple[4],
        ],
        series: [
          {
            type: 'pie',
            name: 'Percentage',
            data: data,
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>',
            },
          },
        ],
      }}
    />
  )
}

export default CircleChart

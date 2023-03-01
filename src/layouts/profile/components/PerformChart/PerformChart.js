import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Paper from '@mui/material/Paper';
import VuiTypography from 'components/VuiTypography';
import { observer } from 'mobx-react-lite';


function PerformanceChart(props) {
  const state = {
    series: [{
      data: props.store !== null ? props.store.getData : [21, 22, 10, 28, 16, 21, 13]
    }],
    options: {
      chart: {
        height: 330,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        },

      },
      colors: ["rgb(255, 113, 91)", "#F9CB40", "#BCED09", "#0FF4C6", "#464F51", "#7D5C65", "#395C6B"],
      theme: {
        monochrome: {
          enabled: true,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
      },
      fill: {
        colors: ["rgb(255, 113, 91)", "#F9CB40", "#BCED09", "#0FF4C6", "#464F51", "#7D5C65", "#395C6B"],
        opacity: 0.9,
        type: 'solid',
        gradient: {
          shade: 'dark',
          type: "horizontal",
          shadeIntensity: 0.9,
          gradientToColors: "black",
          inverseColors: true,
          opacityFrom: 0.5,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: []
        },
        pattern: {
          style: 'verticalLines',
          width: 6,
          height: 6,
          strokeWidth: 2,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: props.store !== null ? props.store.getDays : [
          ['Monday', '12-07-2022'],
          ['Tuesday', '13-07-2023'],
          ['Wednesday', '14-07-2023'],
          ['Thursday', '15-07-2023'],
          ['Friday', '16-07-2022'],
          ['Saturday', '17-07-2023'],
          ['Sunday', '18-07-2023'],
        ],
        labels: {
          style: {
            colors: "#5B7553",
            fontSize: '12px',
            fontWeight: 'bold'
          }
        },
      },
      yaxis: {

      }
    }
  }
  return (
    <Paper sx={{ width: 500, borderRadius: 10, height: 360, margin: 5, padding: 5 }} >
      <VuiTypography color="black" variant="h3" fontWeight="bold">
        Performance
      </VuiTypography>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={249.77} width={414} />
    </Paper >
  );
}


export default observer(PerformanceChart);
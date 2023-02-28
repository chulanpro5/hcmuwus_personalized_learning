import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Paper from '@mui/material/Paper';
import VuiTypography from 'components/VuiTypography';
class PerformanceChart extends React.Component {
  constructor(props) {
    super(props);
    this.colors = ["black", "black", "black", "black", "black", "black", "black"];
    this.state = {

      series: [{
        data: props.data ? props.data : [21, 22, 10, 28, 16, 21, 13]
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
          background: "white",
        },
        colors: this.colors,
        fill: {
          colors: ["#0077FF", "#0077FF", "#0077FF", "#0077FF", "#0077FF", "#0077FF", "#0077FF"],
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
            columnWidth: '45%',
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
          categories: props.categories ? props.categories : [
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
              colors: this.colors,
              fontSize: '12px'
            }
          }
        }
      },


    };
  }



  render() {
    return (
      <Paper sx={{width: 500, borderRadius: 10, height: 360, margin: 5, padding: 5}}>
          <VuiTypography color="black" variant="h3" fontWeight="bold">
            Performance
          </VuiTypography>
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={249.77} width={414} sx={{}}/>
      </Paper>
    );
  }
}

export default PerformanceChart;
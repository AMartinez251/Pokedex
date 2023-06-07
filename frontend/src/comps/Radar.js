import React from 'react';
import Chart from 'react-apexcharts';

const RadarChart = ({ stats }) => {
  const options = {
    chart: {
      id: 'radar-chart'
    },
    markers: {
        size: 3
    },
    xaxis: {
      categories: ['hp', 'attack', 'defense', 'sp. attack', 'sp. defense', 'speed']
    },
    yaxis: {
      show: false,
      min: 0,
      max: 255
    },
    fill: {
      opacity: 0.2
    }
  };

  const series = [
    {
      name: 'Stats',
      data: stats.map((element) => {
        return element.base_stat
      })
    }
  ];


  return (
    <Chart options={options} series={series} type="radar" height={350} />
  );
}

export default RadarChart;
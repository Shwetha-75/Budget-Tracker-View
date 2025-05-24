import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ['', '', ''], // Empty labels
    datasets: [
      {
        label: '',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 0, // No hover effect
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hides legend
      },
      tooltip: {
        enabled: false, // Disables tooltips
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: Array(7).fill(''), // Empty labels
    datasets: [
      {
        label: '',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Hides x-axis grid lines and labels
      },
      y: {
        display: false, // Hides y-axis grid lines and labels
      },
    },
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: false, // Disables tooltips
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;

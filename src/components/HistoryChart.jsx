import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoryChart = ({ history }) => {
  const years = history.map(entry => entry.year);
  const revenues = history.map(entry => entry.revenue);
  const spendings = history.map(entry => entry.spending);
  const debts = history.map(entry => entry.debt);

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Revenue (£bn)',
        data: revenues,
        borderColor: 'green',
        backgroundColor: 'rgba(0,128,0,0.1)',
      },
      {
        label: 'Spending (£bn)',
        data: spendings,
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.1)',
      },
      {
        label: 'Debt (£bn)',
        data: debts,
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.1)',
        yAxisID: 'y1',
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Budget Simulation History'
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Revenue/Spending (£bn)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Debt (£bn)'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <Line data={data} options={options} />
    </div>
  );
};

export default HistoryChart;

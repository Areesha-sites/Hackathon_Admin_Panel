import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { ChartComponentProps } from '../../../types/ComponentsTypes';
const ChartComponent: React.FC<ChartComponentProps> = ({ reviews }) => {
  const chartData = {
    labels: reviews.map((review) => new Date(review.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Reviews by Date',
        data: reviews.map((_, index) => index + 1), 
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#333' },
        ticks: { color: '#fff' },
      },
      x: {
        grid: { color: '#333' },
        ticks: { color: '#fff' },
      },
    },
    plugins: {
      legend: {
        labels: { color: '#fff' },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    } as const, 
  };
  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px' }}>Reviews by Date</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { RatingChartProps } from "../../../types/ComponentsTypes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ActiveElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const RatingChart: React.FC<RatingChartProps> = ({ ratingDistribution, onBarClick }) => {
  const chartData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Rating Distribution",
        data: Object.values(ratingDistribution),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const chartOptions: ChartOptions<'bar'> = {
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#333" },
        ticks: { color: "#fff" },
      },
      x: {
        grid: { color: "#333" },
        ticks: { color: "#fff" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    onClick: (_event, elements: ActiveElement[]) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        onBarClick(clickedIndex + 1);
      }
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
  };
  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Rating Distribution</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default RatingChart;
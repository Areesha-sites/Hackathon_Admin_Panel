import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { SalesChartProps } from "../../../types/ComponentsTypes";
const SalesChart: React.FC<SalesChartProps> = ({ salesData }) => {
  const chartData = {
    labels: salesData.map((item) => item.date),
    datasets: [
      {
        label: "Sales Over Time",
        data: salesData.map((item) => item.salesAmount),
        borderColor: "rgba(0, 0, 0, 1)",
        backgroundColor: "rgba(128, 128, 128, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#000",
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#000",
          font: {
            size: 14,
            family: "Arial",
          },
        },
      },
      title: {
        display: true,
        text: "Sales Over Time (Feb - Jul)",
        color: "#000",
        font: {
          size: 16,
          family: "Arial",
          weight: "bold" as const,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: {
          size: 14,
          family: "Arial",
        },
        titleFont: {
          size: 14,
          family: "Arial",
        },
        padding: 10,
        cornerRadius: 5,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        ticks: {
          color: "#000",
          font: {
            size: 12,
            family: "Arial",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
        ticks: {
          color: "#000",
          font: {
            size: 12,
            family: "Arial",
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad" as const,
    },
  };
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg"
      style={{ height: "300px" }}
    >
      <h2 className="text-xl font-semibold mb-2 dark:text-black">Sales Over Time</h2>
      <div style={{ height: "200px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SalesChart;

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface BarChartDataItem {
  product: string;
  salesAmount: number;
}
interface BarChartProps {
  data: BarChartDataItem[];
}
const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.product),
    datasets: [
      {
        label: "Sales by Product",
        data: data.map((item) => item.salesAmount),
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "rgba(128, 128, 128, 1)",
        borderWidth: 1,
        borderRadius: 5,
        hoverBackgroundColor: "rgba(0, 0, 0, 1)",
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
        text: "Sales by Product (Feb)",
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
      <h2 className="text-xl font-semibold mb-2 dark:text-black">Sales by Product</h2>
      <div style={{ height: "200px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
export default BarChart;

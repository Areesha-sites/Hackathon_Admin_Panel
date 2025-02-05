"use client";
import React, { useRef, useEffect, useState } from "react";
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
  Filler,
  ChartOptions,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

export default function RevenueChart({
  data,
}: {
  data: { date: string; totalRevenue: number; revenueGrowth?: number }[];
}) {
  const chartRef = useRef<any>(null);
  const [chartGradient, setChartGradient] = useState<string | CanvasGradient>(
    "rgba(16, 185, 129, 0.3)"
  );

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 600);
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.8)");
      gradient.addColorStop(1, "rgba(16, 185, 129, 0.1)");
      setChartGradient(gradient);
    }
  }, [data]);

  const averageRevenue =
    data.reduce((acc, item) => acc + item.totalRevenue, 0) / data.length;
  const maxRevenue = Math.max(...data.map((item) => item.totalRevenue));
  const maxRevenueDate = data.find(
    (item) => item.totalRevenue === maxRevenue
  )?.date;

  const chartData = {
    labels: data.map((item) => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: "Total Revenue",
        data: data.map((item) => item.totalRevenue),
        borderColor: "#10B981",
        backgroundColor: chartGradient,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        fill: true,
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Revenue Growth (%)",
        data: data.map((item) => item.revenueGrowth || 0),
        borderColor: "#F59E0B",
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#F59E0B",
        pointBorderColor: "#fff",
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#E5E7EB",
          font: {
            size: 14,
            weight: "bold" as const,
          },
        },
      },
      title: {
        display: true,
        text: "Revenue Trend & Growth Over Time",
        color: "#E5E7EB",
        font: {
          size: 20,
          weight: "bold" as const,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
        borderColor: "#10B981",
        borderWidth: 1,
        callbacks: {
          label: (tooltipItem: any) =>
            ` $${tooltipItem.raw.toLocaleString()} ${
              tooltipItem.dataset.label === "Revenue Growth (%)" ? "%" : ""
            }`,
        },
      },
      annotation: {
        annotations: {
          averageLine: {
            type: "line" as const,
            yMin: averageRevenue,
            yMax: averageRevenue,
            borderColor: "#10B981",
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: `Average: $${averageRevenue.toLocaleString()}`,
              display: true,
              position: "end" as const,
              backgroundColor: "rgba(17, 24, 39, 0.9)",
              color: "#10B981",
              font: {
                size: 12,
                weight: "bold" as const,
              },
            },
          },
          maxRevenuePoint: {
            type: "point" as const,
            xValue: maxRevenueDate,
            yValue: maxRevenue,
            radius: 6,
            backgroundColor: "#10B981",
            borderColor: "#fff",
            borderWidth: 2,
          },
          maxRevenueLabel: {
            type: "label" as const,
            xValue: maxRevenueDate,
            yValue: maxRevenue * 1.05, 
            content: `Max: $${maxRevenue.toLocaleString()}`,
            display: true,
            position: "center" as const, 
            backgroundColor: "rgba(17, 24, 39, 0.9)",
            color: "#10B981",
            font: {
              size: 12,
              weight: "bold" as const,
            },
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#D1D5DB",
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      y: {
        position: "left" as const,
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#D1D5DB",
          font: {
            size: 12,
            weight: 500,
          },
          callback: (value: string | number) => {
            if (typeof value === "number") {
              return `$${value.toLocaleString()}`;
            }
            return value;
          },
        },
      },
      y1: {
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "#F59E0B",
          font: {
            size: 12,
            weight: 500,
          },
          callback: (value: string | number) => {
            if (typeof value === "number") {
              return `${value.toFixed(1)}%`;
            }
            return value;
          },
        },
      },
    },
  };
  return (
    <div className="bg-gray-800 dark:bg-gray-900 shadow-xl rounded-xl p-6 border border-gray-700 w-full h-[600px] md:h-[700px] lg:h-[800px]">
      <Line ref={chartRef} data={chartData} options={options} />
      <div className="text-gray-300 text-sm text-center mt-2">
        Average Revenue:{" "}
        <span className="font-bold text-green-400">
          ${averageRevenue.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BarChartOptions } from "../../utils/ChartOptions/ChartOptions";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const barChartData = {
  labels: ["Food", "Health", "Utilities", "Entertainment", "transport"],
  datasets: [
    {
      label: "Expenses",
      data: [400, 200, 150, 100, 50],
      backgroundColor: ["#f44336", "#2196f3", "#ff9800", "#9c27b0", "#e91e63"],
    },
  ],
};

const BarChart: React.FC = () => {
  return <Bar data={barChartData} options={BarChartOptions} />;
};

export default BarChart;

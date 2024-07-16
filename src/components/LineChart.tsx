import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { LineChartOptions } from "../utils/ChartOptions/ChartOptions";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Monthly Income",
      data: [1200, 1500, 1300, 1700, 1600, 1800, 2000],
      borderColor: "#4caf50",
      backgroundColor: "rgba(76, 175, 80, 0.2)",
    },
  ],
};

const LineChart: React.FC = () => {
  return <Line data={lineChartData} options={LineChartOptions} />;
};

export default LineChart;

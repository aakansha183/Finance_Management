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
import { LineChartProps } from "../utils/interface/types";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);


const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return <Line data={data} options={LineChartOptions} />;
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
};

export default LineChart;

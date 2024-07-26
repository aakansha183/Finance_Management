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
import { LineChartProps } from "../../utils/interface/types";
import { LineChartOptions } from "../../utils/ChartOptions/ChartOptions";


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
};

export default LineChart;

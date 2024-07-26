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
import { BarChartProps } from "../../utils/interface/types";
import { BarChartOptions } from "../../utils/ChartOptions/ChartOptions";


ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const labels = data.map((item) => item.name);
  const budgetedAmounts = data.map((item) => item.budgeted);
  const remainingAmounts = data.map((item) => item.remaining);

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Budgeted Amount",
        data: budgetedAmounts,
        backgroundColor: "#4caf50",
        stack: "stack0",
      },
      {
        label: "Remaining Amount",
        data: remainingAmounts,
        backgroundColor: "#f44336",
        stack: "stack1",
      },
    ],
  };

  return <Bar data={barChartData} options={BarChartOptions} />;
};

export default BarChart;

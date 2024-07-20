import React, { useState, useEffect } from "react";
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
import { BarChartOptions } from "../utils/ChartOptions/ChartOptions";
import { loadExpensesFromStorage } from "../redux/slice/expensesSlice";
import { BarChartData, BarChartProps } from "../utils/interface/types";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);


const BarChart: React.FC<BarChartProps> = ({ userId }) => {
  const [barChartData, setBarChartData] = useState<BarChartData | null>(null);

  useEffect(() => {
    const fetchExpenseData = async () => {
      const expenses = await loadExpensesFromStorage();
      const userExpenses = expenses.filter(
        (expense) => expense.userId === userId
      );

      const expenseByCategory = userExpenses.reduce(
        (acc: { [key: string]: number }, expense) => {
          if (!acc[expense.category]) {
            acc[expense.category] = 0;
          }
          acc[expense.category] += parseInt(expense.amount);
          return acc;
        },
        {}
      );

      const labels = Object.keys(expenseByCategory);
      const data = Object.values(expenseByCategory);

      setBarChartData({
        labels: labels,
        datasets: [
          {
            label: "Expenses",
            data: data,
            backgroundColor: [
              "#f44336",
              "#2196f3",
              "#ff9800",
              "#9c27b0",
              "#e91e63",
            ],
          },
        ],
      });
    };

    fetchExpenseData();
  }, [userId]);

  return barChartData ? (
    <Bar data={barChartData} options={BarChartOptions} />
  ) : null;
};

export default BarChart;

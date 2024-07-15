import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PieChartComponentProps {
  data: { name: string; value: number }[];
}
export const pieChartData = [
  { name: "Food", value: 400 },
  { name: "Health", value: 50 },
  { name: "Utilities", value: 200 },
  { name: "Entertainment", value: 100 },
  { name: "Transport", value: 300 },
];

const COLORS = ["#f44336", "#2196f3", "#ff9800", "#9c27b0", "#e91e63"];

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart  >
      <Pie data={data} dataKey="value" outerRadius={80} fill="#8884d8" label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default PieChartComponent;

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../utils/colors/colors";
import { PieChartComponentProps } from "../utils/interface/types";

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300} >
    <PieChart width={400} height={300} >
      <Pie data={data} dataKey="value" outerRadius={100} fill="#8884d8" label>
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

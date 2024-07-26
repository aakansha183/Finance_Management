import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChartComponent from "./PieChart";
import { ChartsProps } from "../../utils/interface/types";


const Charts: React.FC<ChartsProps> = ({
  lineChartData,
  budgetData,
  expenseData,
}) => (
  <>
    {lineChartData.labels.length > 0 && (
      <Grid item xs={12} md={6}>
        <Box sx={{ p: 2, bgcolor: "background.paper" }}>
          <Typography variant="h6" gutterBottom>
            Monthly Income
          </Typography>
          <LineChart data={lineChartData} />
        </Box>
      </Grid>
    )}
    {budgetData.length > 0 && (
      <Grid item xs={12} md={6}>
        <Box sx={{ p: 2, bgcolor: "background.paper" }}>
          <Typography variant="h6" gutterBottom>
            Budget Distribution
          </Typography>
          <BarChart data={budgetData} />
        </Box>
      </Grid>
    )}
    {expenseData.length > 0 && (
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            p: 2,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Expenses Breakdown
          </Typography>
          <PieChartComponent data={expenseData} />
        </Box>
      </Grid>
    )}
  </>
);

export default Charts;

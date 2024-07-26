import React from "react";
import Grid from "@mui/material/Grid";
import SummaryCard from "./SummaryCard";
import { SummaryCardsProps } from "../../utils/interface/types";


const SummaryCardsDetails: React.FC<SummaryCardsProps> = ({
  totalIncome,
  totalExpense,
  totalBudget,
}) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6} md={4}>
      <SummaryCard
        title="Total Income"
        value={`$${totalIncome.toFixed(2)}`}
        color="#4caf50"
      />
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <SummaryCard
        title="Total Expenses"
        value={`$${totalExpense.toFixed(2)}`}
        color="#f44336"
      />
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <SummaryCard
        title="Budget Balance"
        value={`$${totalBudget.toFixed(2)}`}
        color="#2196f3"
      />
    </Grid>
  </Grid>
);

export default SummaryCardsDetails;

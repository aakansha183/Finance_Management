import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { EmptyStateProps } from "../../utils/interface/types";
import Grid from "@mui/material/Grid";

const EmptyState: React.FC<EmptyStateProps> = ({ currentUser }) => {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          p: 2,
          bgcolor: "background.paper",
          textAlign: "center",
          borderRadius: 1,
          boxShadow: 1,
          mt: 2,
        }}
      >
        <Typography variant="h6" color="textSecondary">
          Welcome <strong>{currentUser?.firstName || "User"}</strong>
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Start adding your income, expenses, and budgets to see your financial
          summary.
        </Typography>
      </Box>
    </Grid>
  );
};

export default EmptyState;

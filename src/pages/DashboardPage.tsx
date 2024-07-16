import React, { useState } from "react";
import { Box, CssBaseline, Container, Typography, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SummaryCard from "../components/SummaryCard";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import PieChartComponent, {
  pieChartData,
} from "../components/PieChart";

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isSidebarOpen ? "240px" : "0",
          transition: "margin 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Welcome to your Dashboard
          </Typography>
          <Grid container spacing={3}>
            {/* Summary Cards */}
            <Grid item xs={12} sm={6} md={4}>
              <SummaryCard
                title="Total Income"
                value="$8,500"
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SummaryCard
                title="Total Expenses"
                value="$2,000"
                color="#f44336"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SummaryCard
                title="Budget Balance"
                value="$6,500"
                color="#2196f3"
              />
            </Grid>

            {/* Charts */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                <Typography variant="h6" gutterBottom>
                  Monthly Income
                </Typography>
                <LineChart />
              </Box>
            </Grid>

            {/* BarChart for Expense */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                <Typography variant="h6" gutterBottom>
                  Expenses Breakdown
                </Typography>
                <BarChart />
              </Box>
            </Grid>

            {/* PieChart for Budget */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                <Typography variant="h6" gutterBottom>
                  Budget Distribution
                </Typography>
                <PieChartComponent data={pieChartData} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;

import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Container, Typography, Grid } from "@mui/material";
import Navbar from "../component/Navbar/Navbar";
import Sidebar from "../component/Sidebar/Sidebar";
import SummaryCard from "../component/SummaryCard/SummaryCard";
import LineChart from "../component/LineChart/LineChart";
import BarChart from "../component/BarChart/BarChart";
import PieChartComponent, {
  pieChartData,
} from "../component/PieChart/PieChart";
import useAuth from "../hooks/useAuth";
import { loadIncomesFromStorage } from "../redux/slice/incomeSlice";

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);

  const { currentUser } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchIncomes = async () => {
      const incomes = await loadIncomesFromStorage();
      const userIncomes = incomes.filter(
        (income) => income.userId === currentUser?.id
      );
      const total = userIncomes.reduce((sum, income) => sum + income.amount, 0);
      setTotalIncome(total);
    };

    if (currentUser) {
      fetchIncomes();
    }
  }, [currentUser]);

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
                value={`$${totalIncome.toFixed(2)}`}
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SummaryCard
                title="Total Expenses"
                value="$2,000" // Replace with actual expense calculation
                color="#f44336"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SummaryCard
                title="Budget Balance"
                value="$6,500" // Replace with actual budget balance calculation
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

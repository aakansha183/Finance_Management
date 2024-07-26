import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";
import SummaryCardsDetails from "../components/Dashboard/SummaryCardsDetails";
import Charts from "../components/Dashboard/Charts";
import DashboardData from "../components/Dashboard/DashboardData";
import EmptyState from "../components/Dashboard/ EmptyState";

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { currentUser } = useAuth();

  const {
    isLoading,
    totalIncome,
    totalExpense,
    totalBudget,
    expenseData,
    budgetData,
    lineChartData,
  } = DashboardData({ currentUser });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const hasData =
    lineChartData.labels.length > 0 ||
    budgetData.length > 0 ||
    expenseData.length > 0;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          marginLeft: isSidebarOpen ? (isMobile ? "0" : "240px") : "0",
          transition: "margin 0.3s ease",
          maxWidth: "100%",
          bgcolor: theme.palette.background.default,
          marginTop: 8,
        }}
      >
        <Container maxWidth="lg">
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <SummaryCardsDetails
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                totalBudget={totalBudget}
              />
              {!hasData ? (
                <EmptyState currentUser={currentUser} />
              ) : (
                <Grid container spacing={3} sx={{ marginTop: 0.8 }}>
                  <Charts
                    lineChartData={lineChartData}
                    budgetData={budgetData}
                    expenseData={expenseData}
                  />
                </Grid>
              )}
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import SummaryCard from "../components/SummaryCard";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import PieChartComponent from "../components/PieChart";
import useAuth from "../hooks/useAuth";
import { loadIncomesFromStorage } from "../redux/slice/incomeSlice";
import { loadExpensesFromStorage } from "../redux/slice/expensesSlice";
import { loadBudgetsFromStorage } from "../redux/slice/budgetSlice";

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetData, setBudgetData] = useState<
    { name: string; value: number }[]
  >([]);
  const [lineChartData, setLineChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  const { currentUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        // Fetching Income
        const incomes = await loadIncomesFromStorage();
        const userIncomes = incomes.filter(
          (income) => income.userId === currentUser?.id
        );
        const totalIncome = userIncomes.reduce(
          (sum, income) => sum + parseInt(income.amount),
          0
        );
        setTotalIncome(totalIncome);

        // Prepare Data for Line Chart
        const monthlyIncome = Array(12).fill(0);
        userIncomes.forEach((income) => {
          const month = new Date(income.date).getMonth();
          monthlyIncome[month] += income.amount;
        });

        const lineChartData = {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Monthly Income",
              data: monthlyIncome,
              borderColor: "#4caf50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
            },
          ],
        };

        setLineChartData(lineChartData);

        // Fetching Expense
        const expenses = await loadExpensesFromStorage();
        const userExpenses = expenses.filter(
          (expense) => expense.userId === currentUser?.id
        );
        const totalExpense = userExpenses.reduce(
          (sum, expense) => sum + parseInt(expense.amount),
          0
        );
        setTotalExpense(totalExpense);

        // Fetching Budget
        const budgets = await loadBudgetsFromStorage();

        const userBudgets = budgets.filter(
          (budget) => budget.userId === currentUser?.id
        );
        const totalBudget = userBudgets.reduce(
          (sum, budget) => sum + parseInt(budget.amountSet),
          0
        );
        setTotalBudget(totalBudget);

        // Preparing Data for Pie Chart
        const budgetDistribution = userBudgets.reduce(
          (acc: { [key: string]: number }, budget) => {
            if (!acc[budget.category]) {
              acc[budget.category] = 0;
            }
            acc[(budget.category)] += parseInt(budget.amountSet);
            return acc;
          },
          {}
        );

        const pieChartData = Object.keys(budgetDistribution).map(
          (category) => ({
            name: category,
            value: budgetDistribution[category],
          })
        );

        setBudgetData(pieChartData);
      }
    };

    fetchData();
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
          marginLeft: isSidebarOpen ? (isMobile ? "0" : "240px") : "0",
          transition: "margin 0.3s ease",
          maxWidth: "100%",
          bgcolor: theme.palette.background.default,
          marginTop: 7,
        }}
      >
        <Container maxWidth="lg">
          {/* <Typography variant="h4" gutterBottom >
            <strong> Dashboard</strong>
          </Typography> */}
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

            {/* Charts */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                <Typography variant="h6" gutterBottom>
                  Monthly Income
                </Typography>
                <LineChart data={lineChartData} />
              </Box>
            </Grid>

            {/* BarChart for Expense */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                <Typography variant="h6" gutterBottom>
                  Expenses Breakdown
                </Typography>
                <BarChart userId={currentUser?.id!} />
              </Box>
            </Grid>
            {/* PieChart for Budget */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: "background.paper" }}>
                <Typography variant="h6" gutterBottom>
                  Budget Distribution
                </Typography>
                <PieChartComponent data={budgetData} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;

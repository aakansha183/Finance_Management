import { useState, useEffect } from "react";
import { loadIncomesFromStorage } from "../../redux/slice/incomeSlice";
import { loadExpensesFromStorage } from "../../redux/slice/expensesSlice";
import { loadBudgetsFromStorage } from "../../redux/slice/budgetSlice";
import { delayPromise } from "../../utils/Delay/DelayPromise";
import { User } from "../../utils/interface/types";


interface DashboardDataProps {
  currentUser: User |null; 
}

const DashboardData = ({ currentUser }: DashboardDataProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [expenseData, setExpenseData] = useState<
    { name: string; value: number }[]
  >([]);
  const [budgetData, setBudgetData] = useState<
    { name: string; budgeted: number; remaining: number }[]
  >([]);
  const [lineChartData, setLineChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const incomes = await loadIncomesFromStorage();
        const userIncomes = incomes.filter(
          (income) => income.userId === currentUser?.id
        );
        const totalIncome = userIncomes.reduce(
          (sum, income) => sum + parseInt(income.amount),
          0
        );
        setTotalIncome(totalIncome);

        const monthlyIncome = Array(12).fill(0);
        userIncomes.forEach((income) => {
          const month = new Date(income.date).getMonth();
          monthlyIncome[month] += parseInt(income.amount);
        });

        if (monthlyIncome.some((amount) => amount > 0)) {
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
        }

        const expenses = await loadExpensesFromStorage();
        const userExpenses = expenses.filter(
          (expense) => expense.userId === currentUser?.id
        );
        const totalExpense = userExpenses.reduce(
          (sum, expense) => sum + parseInt(expense.amount),
          0
        );
        setTotalExpense(totalExpense);

        const expenseDistribution = userExpenses.reduce(
          (acc: { [key: string]: number }, expense) => {
            if (!acc[expense.category]) {
              acc[expense.category] = 0;
            }
            acc[expense.category] += parseInt(expense.amount);
            return acc;
          },
          {}
        );

        const pieChartData = Object.keys(expenseDistribution).map(
          (category) => ({
            name: category,
            value: expenseDistribution[category],
          })
        );

        if (pieChartData.length > 0) {
          setExpenseData(pieChartData);
        }

        const budgets = await loadBudgetsFromStorage();
        const userBudgets = budgets.filter(
          (budget) => budget.userId === currentUser?.id
        );
        const totalBudget = userBudgets.reduce(
          (sum, budget) => sum + parseInt(budget.amountSet),
          0
        );
        setTotalBudget(totalBudget);

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

        const budgetDistribution = userBudgets.map((budget) => {
          const budgetedAmount = parseInt(budget.amountSet);
          const spentAmount = expenseByCategory[budget.category] || 0;
          const remainingAmount = budgetedAmount - spentAmount;
          return {
            name: budget.category,
            budgeted: budgetedAmount,
            remaining: remainingAmount,
          };
        });

        if (budgetDistribution.length > 0) {
          setBudgetData(budgetDistribution);
        }

        await delayPromise();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  return {
    isLoading,
    totalIncome,
    totalExpense,
    totalBudget,
    expenseData,
    budgetData,
    lineChartData,
  };
};

export default DashboardData;

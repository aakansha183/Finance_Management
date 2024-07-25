import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setExpenses,
  addExpense,
  editExpense,
  deleteExpense,
  loadExpensesFromStorage,
  saveExpensesToStorage,
} from "../redux/slice/expensesSlice";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import useAuth from "../hooks/useAuth";
import { Expense } from "../utils/interface/types";
import Layout from "../components/Layout";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

const ExpensePage: React.FC = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const allExpenses = useSelector(
    (state: RootState) => state.expenses.expenses
  );
  const budgets = useSelector((state: RootState) => state.budget.budgets);
  const [editMode, setEditMode] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [prevExpenseAmount, setPrevExpenseAmount] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchExpenses = async () => {
      const storedExpenses = await loadExpensesFromStorage();
      dispatch(setExpenses(storedExpenses));
    };

    fetchExpenses();
  }, [dispatch]);

  useEffect(() => {
    saveExpensesToStorage(allExpenses);
  }, [allExpenses]);

  const handleFormSubmit = (values: Expense) => {
    const expenseWithUserId = { ...values, userId: currentUser?.id! };
    const expenseAmount = parseInt(values.amount);

    const checkBudgetForCategory = budgets.find(
      (budget) => budget.category === values.category
    );

    if (!checkBudgetForCategory) {
      alert(
        `You have not set a budget for ${values.category}. Please set a budget before adding expenses.`
      );
      return;
    }

    const expensesByCategory = allExpenses.reduce(
      (acc: { [key: string]: number }, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = 0;
        }
        acc[expense.category] += parseInt(expense.amount);
        return acc;
      },
      {}
    );

    const currentBudget = parseInt(checkBudgetForCategory.amountSet);
    const totalExpenseForCategory = expensesByCategory[values.category] || 0;

    const newTotalExpense =
      totalExpenseForCategory - (prevExpenseAmount || 0) + expenseAmount;

    if (newTotalExpense > currentBudget) {
      alert(
        `Your expense for ${values.category} exceeds the budget of ${currentBudget}`
      );
    }

    if (editMode && currentExpense !== null) {
      dispatch(editExpense(expenseWithUserId));
      toast.success("Expense Successfully Updated");
    } else {
      dispatch(addExpense(expenseWithUserId));
      toast.success("Expense Successfully Added");
    }

    setEditMode(false);
    setCurrentExpense(null);
    setPrevExpenseAmount(null);
  };

  const handleEdit = (expense: Expense) => {
    setEditMode(true);
    setCurrentExpense(expense);
    setPrevExpenseAmount(parseInt(expense.amount));
  };

  const handleDelete = (date: string) => {
    dispatch(deleteExpense({ date, userId: currentUser?.id! }));
    toast.success("Successfully Deleted");
  };

  return (
    <Layout>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            padding: "0.2rem",
            borderRadius: "8px",
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Expense Tracker
            </Typography>
            <ExpenseForm
              initialValues={
                currentExpense || {
                  amount: "",
                  category: "",
                  date: "",
                  userId: currentUser?.id!,
                }
              }
              onSubmit={handleFormSubmit}
              editMode={editMode}
            />
            <Divider sx={{ marginY: "0.5rem" }} />
            <Box sx={{ textAlign: "center" }}>
              {allExpenses.length > 0 && (
                <Typography variant="h6" gutterBottom>
                  Expense
                </Typography>
              )}
              <ExpenseList
                expenses={allExpenses.filter(
                  (expense) => expense.userId === currentUser?.id
                )}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default ExpensePage;

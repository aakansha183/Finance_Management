import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setExpenses, addExpense, editExpense, deleteExpense, loadExpensesFromStorage, saveExpensesToStorage } from '../redux/slice/expensesSlice';
import { Container, Box, Card, CardContent, Typography } from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { Expense } from '../types/User';
import useAuth from '../hooks/useAuth';
import Layout from '../component/Layout/Layout';

const ExpensePage: React.FC = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const allExpenses = useSelector((state: RootState) => state.expenses.expenses);
  const expenses = allExpenses.filter(expense => expense.userId === currentUser?.id);
  const [editMode, setEditMode] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);

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

    if (editMode && currentExpense !== null) {
      dispatch(editExpense(expenseWithUserId));
    } else {
      dispatch(addExpense(expenseWithUserId));
    }

    setEditMode(false);
    setCurrentExpense(null);
  };

  const handleEdit = (expense: Expense) => {
    setEditMode(true);
    setCurrentExpense(expense);
  };

  const handleDelete = (date: string) => {
    dispatch(deleteExpense({ date, userId: currentUser?.id! }));
  };

  return (
    <Layout>
      <Container>
        <Box
          sx={{
            backgroundImage: `url("/backgroundimg.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <Card sx={{ maxWidth: 600, width: "100%", padding: "2rem" }}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Expense Tracker
              </Typography>
              <ExpenseForm
                initialValues={
                  currentExpense || {
                    amount: 0,
                    category: "",
                    date: "",
                    userId: currentUser?.id!,
                  }
                }
                onSubmit={handleFormSubmit}
                editMode={editMode}
              />
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                sx={{ marginTop: "2rem" }}
              >
                Expenses
              </Typography>
              <ExpenseList
                expenses={expenses}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Layout>
  );
};

export default ExpensePage;

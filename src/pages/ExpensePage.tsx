import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setExpenses, addExpense, editExpense, deleteExpense, loadExpensesFromStorage, saveExpensesToStorage } from '../redux/slice/expensesSlice';
import { Container, Box, Card, CardContent, Typography, Divider } from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import useAuth from '../hooks/useAuth';
import { Expense } from '../utils/interface/types';
import Layout from '../components/Layout';

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
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card sx={{ width: '100%', padding: '2rem' }}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Expense Tracker
              </Typography>
              <ExpenseForm
                initialValues={currentExpense || { amount: '', category: '', date: '', userId: currentUser?.id! }}
                onSubmit={handleFormSubmit}
                editMode={editMode}
              />
              <Divider sx={{ marginY: '2rem' }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  Expenses
                </Typography>
                <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Layout>
  );
};

export default ExpensePage;



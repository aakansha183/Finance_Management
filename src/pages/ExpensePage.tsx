// ExpensePage.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setExpenses, addExpense, editExpense, deleteExpense, loadExpensesFromStorage, saveExpensesToStorage } from '../redux/slice/expensesSlice';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { Expense } from '../types/Expense';

const ExpensePage: React.FC = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const [editMode, setEditMode] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState<number | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      const storedExpenses = await loadExpensesFromStorage();
      dispatch(setExpenses(storedExpenses));
    };

    fetchExpenses();
  }, [dispatch]);

  useEffect(() => {
    saveExpensesToStorage(expenses);
  }, [expenses]);

  const handleFormSubmit = (values: Expense) => {
    if (editMode && currentExpenseId !== null) {
      const updatedExpense: Expense = {
        id: currentExpenseId, // Ensure 'id' is included
        amount: values.amount,
        category: values.category,
        date: values.date,
      };
      dispatch(editExpense(updatedExpense));
    } else {
      const newExpense: Expense = {
        id: Date.now(), // Ensure 'id' is included
        amount: values.amount,
        category: values.category,
        date: values.date,
      };
      dispatch(addExpense(newExpense));
    }

    setEditMode(false);
    setCurrentExpenseId(null);
  };

  const handleEdit = (expense: Expense) => {
    setEditMode(true);
    setCurrentExpenseId(expense.id);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteExpense(id));
  };

  return (
    <Container>
      <Box
        sx={{
          backgroundImage: `url("/backgroundimg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Card sx={{ maxWidth: 600, width: '100%', padding: '2rem' }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Expense Tracker
            </Typography>
            <ExpenseForm
              initialValues={{
                id: currentExpenseId ?? 0, // Initialize 'id' with a default value
                amount: 0,
                category: '',
                date: '',
              }}
              onSubmit={handleFormSubmit}
              editMode={editMode}
            />
            <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: '2rem' }}>
              Expenses
            </Typography>
            <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ExpensePage;

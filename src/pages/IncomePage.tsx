import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setIncomes, addIncome, editIncome, deleteIncome, loadIncomesFromStorage, saveIncomesToStorage } from '../redux/slice/incomeSlice';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import IncomeForm from '../components/IncomeForm';
import IncomeList from '../components/IncomeList';
import { Income } from '../types/Income';

const IncomePage: React.FC = () => {
  const dispatch = useDispatch();
  const incomes = useSelector((state: RootState) => state.incomes.incomes);
  const [editMode, setEditMode] = useState(false);
  const [currentIncomeId, setCurrentIncomeId] = useState<number | null>(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      const storedIncomes = await loadIncomesFromStorage();
      dispatch(setIncomes(storedIncomes));
    };

    fetchIncomes();
  }, [dispatch]);

  useEffect(() => {
    saveIncomesToStorage(incomes);
  }, [incomes]);

  const handleFormSubmit = (values: Income) => {
    if (editMode && currentIncomeId !== null) {
      const updatedIncome: Income = {
        id: currentIncomeId,
        amount: values.amount,
        source: values.source,
        date: values.date,
      };
      dispatch(editIncome(updatedIncome));
    } else {
      const newIncome: Income = {
        id: Date.now(),
        amount: values.amount,
        source: values.source,
        date: values.date,
      };
      dispatch(addIncome(newIncome));
    }

    setEditMode(false);
    setCurrentIncomeId(null);
  };

  const handleEdit = (income: Income) => {
    setEditMode(true);
    setCurrentIncomeId(income.id);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteIncome(id));
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
              Income Tracker
            </Typography>
            <IncomeForm
              initialValues={{
                id: currentIncomeId ?? 0,
                amount: 0,
                source: '',
                date: '',
              }}
              onSubmit={handleFormSubmit}
              editMode={editMode}
            />
            <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: '2rem' }}>
              Incomes
            </Typography>
            <IncomeList incomes={incomes} onEdit={handleEdit} onDelete={handleDelete} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default IncomePage;

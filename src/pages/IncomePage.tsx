
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setIncomes, addIncome, editIncome, deleteIncome, loadIncomesFromStorage, saveIncomesToStorage } from '../redux/slice/incomeSlice';
import {Container,Box,Card,CardContent,Typography,} from '@mui/material';
import IncomeForm from '../components/IncomeForm';
import IncomeList from '../components/IncomeList';
import { Income } from '../types/Income';
import useAuth from '../hooks/useAuth';

const IncomePage: React.FC = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const allIncomes = useSelector((state: RootState) => state.incomes.incomes);
  const incomes = allIncomes.filter(income => income.userId === currentUser?.id);
  const [editMode, setEditMode] = useState(false);
  const [currentIncome, setCurrentIncome] = useState<Income | null>(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      const storedIncomes = await loadIncomesFromStorage();
      dispatch(setIncomes(storedIncomes));
    };

    fetchIncomes();
  }, [dispatch]);

  useEffect(() => {
    saveIncomesToStorage(allIncomes);
  }, [allIncomes]);

  const handleFormSubmit = (values: Income) => {
    const incomeWithUserId = { ...values, userId: currentUser?.id! };

    if (editMode && currentIncome !== null) {
      dispatch(editIncome(incomeWithUserId));
    } else {
      dispatch(addIncome(incomeWithUserId));
    }

    setEditMode(false);
    setCurrentIncome(null);
  };

  const handleEdit = (income: Income) => {
    setEditMode(true);
    setCurrentIncome(income);
  };

  const handleDelete = (date: string) => {
    dispatch(deleteIncome({ date, userId: currentUser?.id! }));
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
              initialValues={currentIncome || { amount: 0, source: '', date: '', userId: currentUser?.id! }}
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


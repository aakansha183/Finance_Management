import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setIncomes, addIncome, editIncome, deleteIncome, loadIncomesFromStorage, saveIncomesToStorage } from '../redux/slice/incomeSlice';
import { Container, Box, Card, CardContent, Typography, Divider } from '@mui/material';
import IncomeForm from '../components/IncomeForm';
import IncomeList from '../components/IncomeList';
import useAuth from '../hooks/useAuth';
import { Income } from '../utils/interface/types';
import Layout from '../components/Layout';

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

  const handleDelete = (date: string, userId: string) => {
    dispatch(deleteIncome({ date, userId }));
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
                Income Tracker
              </Typography>
              <IncomeForm
                initialValues={
                  currentIncome || {
                    amount: "",
                    source: "",
                    date: "",
                    userId: currentUser?.id!,
                  }
                }
                onSubmit={handleFormSubmit}
                editMode={editMode}
              />
              <Divider sx={{ marginY: "2rem" }} />
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                  Incomes
                </Typography>
                <IncomeList
                  incomes={incomes}
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

export default IncomePage;

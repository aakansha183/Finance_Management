import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addBudget,
  setBudgets,
  updateBudget,
  deleteBudget,
} from "../redux/slice/budgetSlice";
import {
  loadBudgetsFromStorage,
  saveBudgetsToStorage,
} from "../redux/slice/budgetSlice";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import BudgetForm from "../components/budgetForm";
import BudgetListItem from "../components/budgetList";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { BudgetFormInput } from "../utils/interface/types";
import { delayPromise } from "../utils/Delay/DelayPromise";
import { CircularProgress } from "@mui/material";

// Styled Components
const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "65vh",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
});

const ContentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const StyledCard = styled(Card)(({ theme }) => ({
  width: "90%",
  maxWidth: "600px",
  backgroundColor: "white",
  opacity: 0.9,
}));

const Title = styled(Typography)({
  textAlign: "center",
  margin: "3px",
  color: "black",
});

const BudgetPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );
  const budgets = useSelector((state: RootState) => state.budget.budgets);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [, setCurrentEdit] = useState<string>("");
  const [currentBudget, setCurrentBudget] = useState<BudgetFormInput | null>(
    null
  );

  useEffect(() => {
    const loadBudgets = async () => {
      setIsLoading(true);
      const loadedBudgets = await loadBudgetsFromStorage();
      await delayPromise();
      setIsLoading(false);
      dispatch(setBudgets(loadedBudgets));
    };
    loadBudgets();
  }, [dispatch]);

  const handleEditClick = (budget: BudgetFormInput) => {
    setEditMode(true);
    setCurrentEdit(budget.category);
    setCurrentBudget(budget);
  };

  const handleAddOrUpdateBudget = async (data: BudgetFormInput) => {
    if (!currentUser) return;
    const budgetData = { ...data, userId: currentUser.id };
    const existingBudgetIndex = budgets.findIndex(
      (b) => b.category === budgetData.category && b.userId === currentUser.id
    );
    if (existingBudgetIndex !== -1) {
      const updatedBudget = { ...budgets[existingBudgetIndex], ...budgetData };
      const newBudgets = [...budgets];
      newBudgets[existingBudgetIndex] = updatedBudget;
      toast.success("Successfully Updated Budget");
      dispatch(updateBudget(updatedBudget));
      await saveBudgetsToStorage(newBudgets);
    } else {
      dispatch(addBudget(budgetData));
      const newBudgets = [...budgets, budgetData];
      toast.success("Successfully Added Budget");
      await saveBudgetsToStorage(newBudgets);
    }
    resetForm();
  };

  const handleDeleteBudget = async (category: string) => {
    if (!currentUser) return;
    const newBudgets = budgets.filter(
      (b) => b.category !== category || b.userId !== currentUser.id
    );
    dispatch(deleteBudget({ category, userId: currentUser.id }));
    await saveBudgetsToStorage(newBudgets);
    toast.success("Successfully Deleted Budget");
  };

  const resetForm = () => {
    setEditMode(false);
    setCurrentEdit("");
    setCurrentBudget(null);
  };

  if (!currentUser) {
    return <div>Please log in to manage your budgets.</div>;
  }

  const userBudgets = budgets.filter(
    (budget) => budget.userId === currentUser.id
  );

  return (
    <Layout>
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
        <Container>
          <ContentWrapper>
            <StyledCard>
              <Title variant="h4">Budget Management</Title>
              <CardContent>
                <BudgetForm
                  onSubmit={handleAddOrUpdateBudget}
                  editMode={editMode}
                  defaultValues={
                    currentBudget || {
                      category: "",
                      amountSet: "",
                      userId: "",
                    }
                  }
                />
              </CardContent>
              <CardContent>
                <List>
                  {userBudgets.map((budget, index) => (
                    <BudgetListItem
                      key={index}
                      budget={budget}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteBudget}
                    />
                  ))}
                </List>
              </CardContent>
            </StyledCard>
          </ContentWrapper>
        </Container>
      )}
    </Layout>
  );
};

export default BudgetPage;

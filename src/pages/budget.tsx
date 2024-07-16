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
import { Container, List, Paper } from "@mui/material";
import BudgetForm from "../components/budgetForm";
import BudgetListItem from "../components/budgetList";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import { BudgetFormInput } from "../utils/interface/types";

const BudgetPage: React.FC = () => {
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
      const loadedBudgets = await loadBudgetsFromStorage();
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
      toast.success("Succesfully UpdateBudget Added");
      dispatch(updateBudget(updatedBudget));
      await saveBudgetsToStorage(newBudgets);
    } else {
      dispatch(addBudget(budgetData));
      const newBudgets = [...budgets, budgetData];
      toast.success("Succesfully Budget Added");
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
      <div
        style={{
          backgroundImage: `url(/budget.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "10px",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Budget Management</h1>
            <BudgetForm
              onSubmit={handleAddOrUpdateBudget}
              editMode={editMode}
              defaultValues={
                currentBudget || {
                  category: "",
                  amountSet: 0,
                  amountSpent: 0,
                  userId: "",
                }
              }
            />
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
          </Paper>
        </Container>
      </div>
    </Layout>
  );
};

export default BudgetPage;

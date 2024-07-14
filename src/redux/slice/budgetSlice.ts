// src/redux/slice/budgetSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localforage from 'localforage';

interface Budget {
  category: string;
  amountSet: number;
  amountSpent: number;
}

interface BudgetState {
  budgets: Budget[];
}

const initialState: BudgetState = {
  budgets: [],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudgets(state, action: PayloadAction<Budget[]>) {
      state.budgets = action.payload;
    },
    addBudget(state, action: PayloadAction<Budget>) {
      state.budgets.push(action.payload);
    },
    updateBudget(state, action: PayloadAction<Budget>) {
      const index = state.budgets.findIndex(budget => budget.category === action.payload.category);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
    },
    deleteBudget(state, action: PayloadAction<string>) {
      state.budgets = state.budgets.filter(budget => budget.category !== action.payload);
    },
  },
});

export const { setBudgets, addBudget, updateBudget, deleteBudget } = budgetSlice.actions;

export const loadBudgetsFromStorage = async (): Promise<Budget[]> => {
  const budgets = await localforage.getItem<Budget[]>('budgets');
  return budgets || [];
};

export const saveBudgetsToStorage = async (budgets: Budget[]) => {
  await localforage.setItem('budgets', budgets);
};

export default budgetSlice.reducer;


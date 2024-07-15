import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { Expense } from '../../types/Expense';



interface ExpenseState {
  expenses: Expense[];
}

const initialState: ExpenseState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses(state, action: PayloadAction<Expense[]>) {
      state.expenses = action.payload;
    },
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
    },
    editExpense(state, action: PayloadAction<Expense>) {
      const index = state.expenses.findIndex(expense => expense.date === action.payload.date && expense.userId === action.payload.userId);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense(state, action: PayloadAction<{ date: string; userId: string }>) {
      state.expenses = state.expenses.filter(expense => expense.date !== action.payload.date || expense.userId !== action.payload.userId);
    },
  },
});

export const { setExpenses, addExpense, editExpense, deleteExpense } = expenseSlice.actions;

export const loadExpensesFromStorage = async (): Promise<Expense[]> => {
  const expenses = await localforage.getItem<Expense[]>('expenses');
  return expenses || [];
};

export const saveExpensesToStorage = async (expenses: Expense[]) => {
  await localforage.setItem('expenses', expenses);
};

export default expenseSlice.reducer;

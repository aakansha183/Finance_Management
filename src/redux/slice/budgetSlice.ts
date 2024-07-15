

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import localforage from 'localforage';
// import { BudgetFormInput } from '../../types/User';



// interface BudgetState {
//   budgets: BudgetFormInput[];
// }

// const initialState: BudgetState = {
//   budgets: [],
// };

// const budgetSlice = createSlice({
//   name: 'budget',
//   initialState,
//   reducers: {
//     setBudgets(state, action: PayloadAction<BudgetFormInput[]>) {
//       state.budgets = action.payload;
//     },
//     addBudget(state, action: PayloadAction<BudgetFormInput>) {
//       state.budgets.push(action.payload);
//     },
//     updateBudget(state, action: PayloadAction<BudgetFormInput>) {
//       const index = state.budgets.findIndex(budget => budget.category === action.payload.category);
//       if (index !== -1) {
//         state.budgets[index] = action.payload;
//       }
//     },
//     deleteBudget(state, action: PayloadAction<string>) {
//       state.budgets = state.budgets.filter(budget => budget.category !== action.payload);
//     },
//   },
// });

// export const { setBudgets, addBudget, updateBudget, deleteBudget } = budgetSlice.actions;

// export const loadBudgetsFromStorage = async (): Promise<BudgetFormInput[]> => {
//   const budgets = await localforage.getItem<BudgetFormInput[]>('budgets');
//   return budgets || [];
// };

// export const saveBudgetsToStorage = async (budgets: BudgetFormInput[]) => {
//   await localforage.setItem('budgets', budgets);
// };

// export default budgetSlice.reducer;

// redux/slice/budgetSlice.ts


//recent
// budgetSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { BudgetFormInput } from '../../types/User';

interface BudgetState {
  budgets: BudgetFormInput[];
}

const initialState: BudgetState = {
  budgets: [],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudgets: (state, action: PayloadAction<BudgetFormInput[]>) => {
      state.budgets = action.payload;
    },
    addBudget: (state, action: PayloadAction<BudgetFormInput>) => {
      state.budgets.push(action.payload);
    },
    updateBudget: (state, action: PayloadAction<BudgetFormInput>) => {
      const index = state.budgets.findIndex(b => b.category === action.payload.category && b.userId === action.payload.userId);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
    },
    deleteBudget: (state, action: PayloadAction<{ category: string; userId: string }>) => {
      state.budgets = state.budgets.filter(b => b.category !== action.payload.category || b.userId !== action.payload.userId);
    },
  },
});

export const { setBudgets, addBudget, updateBudget, deleteBudget } = budgetSlice.actions;

export const loadBudgetsFromStorage = async (): Promise<BudgetFormInput[]> => {
  const budgets = await localforage.getItem<BudgetFormInput[]>('budgets');
  return budgets || [];
};

export const saveBudgetsToStorage = async (budgets: BudgetFormInput[]) => {
  await localforage.setItem('budgets', budgets);
};

export default budgetSlice.reducer;

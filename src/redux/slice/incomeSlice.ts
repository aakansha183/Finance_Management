import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import localforage from "localforage";
import { Income } from "../../utils/interface/types";

interface IncomeState {
  incomes: Income[];
}

const initialState: IncomeState = {
  incomes: [],
};

const incomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    setIncomes(state, action: PayloadAction<Income[]>) {
      state.incomes = action.payload;
    },
    addIncome(state, action: PayloadAction<Income>) {
      state.incomes.push(action.payload);
    },
    editIncome(state, action: PayloadAction<Income>) {
      const index = state.incomes.findIndex(
        (income) =>
          income.date === action.payload.date &&
          income.userId === action.payload.userId
      );
      if (index !== -1) {
        state.incomes[index] = action.payload;
      }
    },
    deleteIncome(
      state,
      action: PayloadAction<{ date: string; userId: string }>
    ) {
      state.incomes = state.incomes.filter(
        (income) =>
          income.date !== action.payload.date ||
          income.userId !== action.payload.userId
      );
    },
  },
});

export const { setIncomes, addIncome, editIncome, deleteIncome } =
  incomeSlice.actions;

export const loadIncomesFromStorage = async (): Promise<Income[]> => {
  const incomes = await localforage.getItem<Income[]>("incomes");
  return incomes || [];
};

export const saveIncomesToStorage = async (incomes: Income[]) => {
  await localforage.setItem("incomes", incomes);
};

export default incomeSlice.reducer;

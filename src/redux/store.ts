
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userslice';
import budgetSlice from './slice/budgetSlice';
import expenseReducer from './slice/expensesSlice';
import incomeReducer from './slice/incomeSlice';
import transactionSlice from './slice/transactionSlice';

const store = configureStore({
    reducer: {
        transactions: transactionSlice,
        users: userReducer,
        budget: budgetSlice,
        expenses: expenseReducer,
        incomes: incomeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

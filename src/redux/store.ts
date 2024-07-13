
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userslice';
import expenseReducer from './slice/expensesSlice';
import incomeReducer from './slice/incomeSlice'; // Import the new slice

const store = configureStore({
    reducer: {
        users: userReducer,
        expenses: expenseReducer,
        incomes: incomeReducer, 
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

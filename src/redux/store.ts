import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userslice';
import budgetSlice from './slice/budgetSlice';

const store = configureStore({
    reducer: {
        users: userReducer,
        budget: budgetSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

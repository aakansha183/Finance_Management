
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { Expense, Income } from '../../utils/interface/types';

export interface Transaction {
    amount: number;
    category: string;
    date: string;
    type: 'income' | 'expense';
    userId: string;
}

interface TransactionState {
    transactions: Transaction[];
}

const initialState: TransactionState = {
    transactions: [],
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions(state, action: PayloadAction<Transaction[]>) {
            state.transactions = action.payload;
        },
        addTransaction(state, action: PayloadAction<Transaction>) {
            state.transactions.push(action.payload);
        },
        editTransaction(state, action: PayloadAction<Transaction>) {
            const index = state.transactions.findIndex(
                (transaction) =>
                    transaction.date === action.payload.date &&
                    transaction.userId === action.payload.userId &&
                    transaction.type === action.payload.type
            );
            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },
        deleteTransaction(
            state,
            action: PayloadAction<{ date: string; userId: string; type: 'income' | 'expense' }>
        ) {
            state.transactions = state.transactions.filter(
                (transaction) =>
                    transaction.date !== action.payload.date ||
                    transaction.userId !== action.payload.userId ||
                    transaction.type !== action.payload.type
            );
        },
    },
});

export const { setTransactions, addTransaction, editTransaction, deleteTransaction } = transactionSlice.actions;

export const loadTransactionsFromStorage = async (): Promise<Transaction[]> => {
    const incomes = await localforage.getItem<Income[]>('incomes');
    const expenses = await localforage.getItem<Expense[]>('expenses');

    const transactions: Transaction[] = [];

    if (incomes) {
        incomes.forEach((income) =>
            transactions.push({ ...income, type: 'income', category: income.source }) // Transforming source to category for incomes
        );
    }

    if (expenses) {
        expenses.forEach((expense) =>
            transactions.push({ ...expense, type: 'expense' })
        );
    }

    return transactions;
};

export const saveTransactionsToStorage = async (transactions: Transaction[]) => {
    const incomes = transactions
        .filter((transaction) => transaction.type === 'income')
        .map(({ amount, date, userId, category }) => ({ amount, date, userId, source: category })); // Transforming back category to source for incomes
    const expenses = transactions.filter((transaction) => transaction.type === 'expense');

    await localforage.setItem('incomes', incomes);
    await localforage.setItem('expenses', expenses);
};

export default transactionSlice.reducer;

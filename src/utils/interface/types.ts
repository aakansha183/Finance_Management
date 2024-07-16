export interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}
export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface BudgetFormInput {
  category: string;
  amountSet: number;
  amountSpent: number;
  userId?: string;
}

export const categories = [
  "food",
  "transport",
  "utilities",
  "entertainment",
  "health",
];

export interface Expense {
  amount: number;
  category: string;
  date: string;
  userId: string;
}

export interface Income {
  amount: number;
  source: string;
  date: string;
  userId: string;
}
  

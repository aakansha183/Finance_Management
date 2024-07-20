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
    amountSet: string;
    amountSpent: string;
    userId?: string;  
  }
  
  export interface FormData {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  }

  export const categories = ['food', 'transport', 'utilities', 'entertainment', 'health'];
  
export interface Expense {
  amount: string;
  category: string;
  date: string;
  userId: string;
}

export interface Income {
  amount: string;
  source: string;
  date: string;
  userId: string;
}

export interface UserState {
  users: User[];
  currentUser: User | null;
}
export interface SummaryCardProps {
  title: string;
  value: string;
  color: string;
}
export interface Transaction {
  amount: string;
  category: string;
  date: string;
  type: "income" | "expense";
  userId: string;
}
export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}
export interface ExpenseFormProps {
  initialValues: Expense;
  onSubmit: (values: Expense) => void;
  editMode: boolean;
}
export interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (date: string, userId: string) => void;
}
export interface IncomeFormProps {
  initialValues: Income;
  onSubmit: (values: Income) => void;
  editMode: boolean;
}
export interface IncomeListProps {
  incomes: Income[];
  onEdit: (income: Income) => void;
  onDelete: (date: string, userId: string) => void;
}
export interface LoginFormValues {
  username: string;
  password: string;
}
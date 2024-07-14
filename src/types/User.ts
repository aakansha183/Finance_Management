export interface User {
    
    id: string;
    username: string;
    password: string;
    email:string;
    firstName:string;
    lastName:string;
   
}

export interface BudgetFormInput {
    category: string;
    amountSet: number;
    amountSpent: number;
  }
  
  export const categories = ['food', 'transport', 'utilities', 'entertainment', 'health'];
  
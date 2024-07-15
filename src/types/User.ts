export interface User {
    
    id: string;
    username: string;
    password: string;
    email:string;
    firstName:string;
    lastName:string;
   
}
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
  

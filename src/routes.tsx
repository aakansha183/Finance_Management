import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import Login from './pages/loginpage';
import Register from './pages/register';
import BudgetPage from './pages/budget';
import ExpensePage from './pages/ExpensePage'; 
import IncomePage from './pages/IncomePage'; 

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/expenses" element={<ExpensePage />} /> 
        <Route path="/incomes" element={<IncomePage />} />
          <Route path="/budget" element={<BudgetPage/>} />
      </Routes>
    </Router>
  );

};

export default AppRoutes;


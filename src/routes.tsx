import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import Login from './pages/loginpage';
import Register from './pages/register';
import ExpensePage from './pages/ExpensePage'; // Import ExpensePage component
import IncomePage from './pages/IncomePage'; // Import IncomePage component

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/expenses" element={<ExpensePage />} /> {/* Add ExpensePage route */}
        <Route path="/incomes" element={<IncomePage />} /> {/* Add IncomePage route */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;


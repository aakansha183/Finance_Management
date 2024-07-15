import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Login from "./pages/loginpage";
import Register from "./pages/register";
import Dashboard from "./pages/DashboardPage";
import ExpenseTracker from "./pages/ExpenseTracker";
import Income from "./pages/Income";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
        <Route path="/income" element={<Income />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

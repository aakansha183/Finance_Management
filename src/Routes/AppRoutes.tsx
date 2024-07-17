import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage";
import Login from "../pages/loginpage";
import Register from "../pages/register";
import Dashboard from "../pages/DashboardPage";
import BudgetPage from "../pages/budget";
import ExpensePage from "../pages/ExpensePage";
import IncomePage from "../pages/IncomePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../components/Profile";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpensePage />} />
          <Route path="/incomes" element={<IncomePage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

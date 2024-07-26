import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage";
import Login from "../pages/loginpage";
import Register from "../pages/register";
import Dashboard from "../pages/DashboardPage";
import BudgetPage from "../pages/budget";
import ExpensePage from "../pages/ExpensePage";
import IncomePage from "../pages/IncomePage";
import Profile from "../components/Profile";
import TransactionPage from "../pages/TransactionPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpensePage />} />
          <Route path="/incomes" element={<IncomePage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/transaction-history" element={<TransactionPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

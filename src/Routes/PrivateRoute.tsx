import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface PrivateRouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;

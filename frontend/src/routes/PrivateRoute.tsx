import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.token !== null
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

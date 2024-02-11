import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  isAuthenticated: boolean;
  children?: React.ReactNode;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
};
const ProtectedRoute = ({
  isAuthenticated,
  children,
  admin,
  adminOnly,
  redirect = "/",
}: Props) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;

  if(adminOnly && !admin) return <Navigate to={redirect} />;
 
  return children ? children : <Outlet />;
};

export default ProtectedRoute;

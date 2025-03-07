import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin = () => {
  const rol = localStorage.getItem("rol");

  return rol === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default ProtectedRouteAdmin;
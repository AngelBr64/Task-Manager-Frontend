import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import TaskPersonals from './pages/TaskPersonals/TaskPersonals';
import MainLayout from './layouts/MainLayout';
import UsersPage from './pages/UsersPage/UsersPage';
import ProtectedRoute from './ProtectedRoute';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas protegidas para usuarios autenticados */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/dashboard/tasks" element={<MainLayout><TaskPersonals /></MainLayout>} />
        
        {/* Ruta protegida adicionalmente para admins */}
        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/dashboard/users" element={<MainLayout><UsersPage /></MainLayout>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
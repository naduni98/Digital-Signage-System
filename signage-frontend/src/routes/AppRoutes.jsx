// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Dashboard from '../features/dashboard/pages/Dashboard';
import MediaPage from '../features/dashboard/pages/MediaPage';
import ProtectedLayout from '../components/layouts/ProtectedLayout';
import UsersPage from '../features/dashboard/pages/UsersPage';
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
     <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />
      <Route
        path="/media"
        element={
          <ProtectedLayout>
            <MediaPage />
          </ProtectedLayout>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedLayout>
            <UsersPage />
          </ProtectedLayout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;

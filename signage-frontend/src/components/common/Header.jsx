// src/components/common/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuthData } from '../../features/auth/utils/token';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();
    navigate('/');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Signage System</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
}

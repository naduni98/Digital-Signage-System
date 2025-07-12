// src/components/layouts/ProtectedLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <Header />

      {/* Layout Body: Sidebar + Main Content */}
      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-screen bg-gray-50 px-32 py-6 pt-[96px]">
          {children}
        </main>
      </div>
    </div>
  );
}

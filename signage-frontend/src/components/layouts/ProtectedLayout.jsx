// src/components/layouts/ProtectedLayout.jsx
import React from 'react';
import Header from './Header';

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 p-4 px-32">
        {children}
      </main>
    </div>
  );
}

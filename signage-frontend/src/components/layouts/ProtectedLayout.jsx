// src/components/layouts/ProtectedLayout.jsx
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Layout Body: Sidebar + Main Content */}
      <div className="flex">
        <Sidebar />

        <main className="min-h-screen bg-[#222831] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32
 py-6 pt-[96px] w-full">

          {children}
        </main>
      </div>
    </div>
  );
}

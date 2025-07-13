// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { FaBell, FaSearch,FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { clearAuthData, getAuthData } from '../../features/auth/utils/token';


export default function Header() {
   const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { username,avatar } = getAuthData();


  const handleLogout = () => {
    clearAuthData();
    navigate('/');
  };

    return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between bg-[#222831] px-32 py-6 shadow-xl">

      {/* Left - Logo and Title */}
      <div className="flex items-center gap-3">
        <img src="/assets/logo01.png" alt="PAGOON" className="w-8 h-8" />
        <h1 className="text-white font-semibold text-lg tracking-wide">PAGOON</h1>
      </div>

      {/* Right - Search, Notifications, Profile */}
      <div className="flex items-center gap-4 text-white">
        <FaSearch className="cursor-pointer hover:text-gray-300" />
        <FaBell className="cursor-pointer hover:text-gray-300 relative">
          <span className="absolute -top-2 -right-2 h-2 w-2 bg-red-500 rounded-full" />
        </FaBell>

        <div className="flex items-center gap-2 cursor-pointer relative" onClick={() => setDropdownOpen(!dropdownOpen)}>

          <span className="text-white text-sm">{username}</span>
          {/* <FaChevronDown className="text-white text-xs" /> */}

          {avatar && (
            <img
              src={avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-white"
            />
          )}

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-[#2f3237] shadow-xl rounded-xl overflow-hidden z-10 border border-[#444]">
              <div className="px-4 py-3 border-b border-[#3a3d42] text-white text-sm">
    Signed in as {username}
   
  </div>

  <button
    onClick={handleLogout}
    className="px-4 py-3 w-full text-left text-white hover:bg-[#3c3f45] text-sm transition duration-150"
  >
    Logout
  </button>
</div>
          )}
        </div>
      </div>
    </header>
  );
};



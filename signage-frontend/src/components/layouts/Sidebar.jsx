import React, { useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaPhotoVideo,
  FaCog,
} from 'react-icons/fa';
import './SidebarShadow.css';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => setExpanded(!expanded);

  return (
    <div
      className={`
        fixed left-0 top-1/2 -translate-y-1/2
        flex flex-col text-white transition-all duration-300
        ${expanded ? 'w-64' : 'w-20'}
        bg-gradient-to-b from-gray-900 to-blue-900
        rounded-tr-[30px] rounded-br-[30px]
        h-[500px] mt-[32px]
        z-50
      `}
    >
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center space-x-2">
          <img
            src="/Digital-Signage-System/assets/logo01.png"
            alt="Logo"
            className="w-8 h-8"
          />
          {expanded && <span className="text-lg font-bold">PAGOON</span>}
        </div>
        <button onClick={toggleSidebar} className="text-white">
          {expanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-6 mt-6">
        <SidebarItem icon={<FaTachometerAlt />} label="Dashboard" expanded={expanded} />
        <SidebarItem icon={<FaCalendarAlt />} label="Scheduler" expanded={expanded} />
        <SidebarItem icon={<FaUsers />} label="Users" expanded={expanded} />
        <SidebarItem icon={<FaPhotoVideo />} label="Media" expanded={expanded} />
        <SidebarItem icon={<FaCog />} label="Settings" expanded={expanded} />
      </nav>
    </div>
  );
}

function SidebarItem({ icon, label, expanded }) {
  return (
    <div className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer rounded transition">
      <span className="text-xl">{icon}</span>
      {expanded && <span className="ml-3">{label}</span>}
    </div>
  );
}

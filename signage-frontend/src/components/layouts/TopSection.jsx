import React, { useState, useEffect } from "react";

export default function TopSection({ page = "users", onAdd }) {
  const titleMap = {
    users: "User Management",
    devices: "Device Management",
    media: "Media Management",
  };

  const buttonMap = {
    users: "Add User",
    devices: "Add Device",
    media: "Add Media",
  };

  const [time, setTime] = useState(getCurrentTime());

  // Helper function to format current time as HH:MM AM/PM
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="w-full text-white rounded-t-md  space-y-4">
      {/* Row 1: Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-lg font-semibold">
          {titleMap[page] || "Management"}
        </div>
        <span className="text-sm text-gray-300 whitespace-nowrap">
          {time}
        </span>
      </div>

      {/* Row 2: Search, Select, Clock, Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Search and Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#2A2F38] text-white pl-10 pr-4 py-2 rounded-md focus:outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          <select className="bg-[#2A2F38] text-white px-3 py-2 rounded-md focus:outline-none">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* Right Side: Clock and Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              console.log("Add User button clicked");
              onAdd();
            }}
            className="bg-[#4361EE] text-white px-8 py-2 rounded-2xl font-medium hover:opacity-90 whitespace-nowrap"
          >
            {buttonMap[page] || "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

// src/components/users/UserModal.jsx
import React, { useState, useEffect } from "react";

import { registerUser } from "../../auth/services/authService"; // adjust path as needed

const UserModal = ({ isOpen, onClose, onUserCreated }) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    avatar: "", // optional
    roleId: 3,
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        avatar: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarSelect = (i) => {
    setFormData((prev) => ({
      ...prev,
      avatar: `/assets/avatars/avatar${i}.png`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await registerUser(formData);
      alert("User registered!");
      onClose();
      onUserCreated?.();
    } catch (err) {
      console.error("Register User Error:", err);
      alert(err.message);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#222831] text-white rounded-3xl shadow-lg w-full max-w-2xl relative">
        <div
          className="h-[100px] w-full bg-cover bg-center rounded-t-3xl flex items-center justify-center"
          style={{
            backgroundImage: "url(/assets/starry-background.jpg')",
          }}
        >
          <button
            className="absolute top-4 right-4 text-white text-xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="py-4 w-full max-w-2xl relative flex items-center justify-center">
          <h2 className="text-white text-lg font-semibold">Add New User</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 md:grid-cols-2 gap-4 px-6"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              required
              className="bg-[#31363F] text-white p-2 rounded-2xl"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              required
              className="bg-[#31363F] text-white p-2 rounded-2xl"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">E-mail</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="text"
              required
              className="bg-[#31363F] text-white p-2 rounded-2xl"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">user name</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              required
              className="bg-[#31363F] text-white p-2 rounded-2xl"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="text"
              required
              className="bg-[#31363F] text-white p-2 rounded-2xl"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="text"
              required
              className="bg-[#31363F] text-white p-2 rounded-2xl"
            />
          </div>
          <div className="col-span-2 mt-4">
            <label className="block mb-2">Avatar</label>
            <div className="flex space-x-3">
              {[1, 2, 3, 4, 5, 6].map((i) => {
                const path = `/assets/avatars/avatar${i}.png`;
                return (
                  <img
                    key={i}
                    src={path}
                    alt={`avatar${i}`}
                    onClick={() => handleAvatarSelect(i)}
                    className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                      formData.avatar === path
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="col-span-2 flex justify-end mt-6 mb-8">
            <button
              type="submit"
              className="bg-blue-600 px-6 py-2 rounded-2xl hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;

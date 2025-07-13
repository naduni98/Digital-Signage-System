// src/features/auth/services/authService.js
import axios from 'axios';
const token = localStorage.getItem('token');

export const loginUser = async (email, password) => {
  const response = await axios.post('http://localhost:5000/api/auth/login', {
    email,
    password,
  });
  return response.data; // { token, username, roleId }
};

export const getAllUsers = async () => {
  const response = await axios.get('http://localhost:5000/api/auth/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

// src/auth/services/authService.js

// src/features/auth/services/authService.js
export const registerUser = async (data) => {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error || "Registration failed");
  }
  return result;
};

export const softDeleteUser = async (id) => {
  
  const res = await fetch(`http://localhost:5000/api/auth/soft-delete/${id}`, {
    method: "PUT",
     headers: {
      Authorization: `Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error("Failed to soft delete user");
  }

  return res.json();
};

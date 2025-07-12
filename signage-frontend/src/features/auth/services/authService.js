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
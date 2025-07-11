// src/features/auth/services/authService.js
import axios from 'axios';

export const loginUser = async (username, password) => {
  const response = await axios.post('http://localhost:5000/api/auth/login', {
    username,
    password,
  });
  return response.data; // { token, username, roleId }
};

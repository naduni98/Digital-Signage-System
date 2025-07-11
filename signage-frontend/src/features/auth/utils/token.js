// src/features/auth/utils/token.js
import { jwtDecode } from 'jwt-decode'; // ✅ Use curly braces


export const saveAuthData = ({ token, username, roleId }) => {
     const decoded = jwtDecode(token);
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  localStorage.setItem('roleId', roleId);
  localStorage.setItem('expiry', decoded.exp);
};

export const getAuthData = () => ({
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
  roleId: localStorage.getItem('roleId'),
});

export const clearAuthData = () => {
  localStorage.clear();
};

export const isTokenExpired = () => {
  const expiry = localStorage.getItem('expiry');
  if (!expiry) return true;

  const now = Math.floor(Date.now() / 1000); // in seconds
  return now > parseInt(expiry);
};

export const logoutUser = () => {
  localStorage.clear();
  window.location.href = '/'; // redirect to login
};

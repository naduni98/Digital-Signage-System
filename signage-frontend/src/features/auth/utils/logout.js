// src/features/auth/utils/logout.js
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('roleId');
  window.location.href = '/'; // Redirect to login page
};

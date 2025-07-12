
export function setAuthCookies({ token, username, role }) {
  if (token) localStorage.setItem('token', token);
  if (username) localStorage.setItem('username', username);
  if (role !== undefined) localStorage.setItem('role', role);
}
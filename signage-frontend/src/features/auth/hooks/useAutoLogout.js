import { useEffect } from 'react';
import { isTokenExpired, logoutUser } from '../utils/token';


export const useAutoLogout = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTokenExpired()) {
        alert('Session expired, please log in again');
        logoutUser();
      }
    }, 100000); // check every 10 seconds

    return () => clearInterval(interval);
  }, []);
};

// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useAutoLogout } from './features/auth/hooks/useAutoLogout';

function App() {
  useAutoLogout();
  return (
    
    <BrowserRouter>
   
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

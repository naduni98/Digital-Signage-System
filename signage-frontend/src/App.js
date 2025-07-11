// src/App.js
import React from 'react';
import { HashRouter } from "react-router-dom";

import AppRoutes from './routes/AppRoutes';
import { useAutoLogout } from './features/auth/hooks/useAutoLogout';

function App() {
  useAutoLogout();
  return (
   
   
      <AppRoutes />

  );
}

export default App;

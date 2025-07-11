import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { saveAuthData } from '../utils/token';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, username, roleId } = await loginUser(email, password);
      saveAuthData({ token, username, roleId });

      // Navigate based on role
      if (roleId === 1 || roleId === 2) {
        navigate('/dashboard');
      } else if (roleId === 3) {
        navigate('/media');
      } else {
        setError('Invalid role');
      }
    } catch (err) {
      console.error('Login error', err);
      setError('Invalid credentials');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/bg.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img src="/assets/logo01.png" alt="Logo" className="w-20 h-20 mb-4" />
          <h2 className="text-2xl font-semibold text-white">Welcome Back</h2>
          <p className="text-sm text-gray-400">Simple Signs, Smart Solutions</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-white mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your e-mail"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-white mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-blue-400 hover:underline">
                Forgot password
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-8 text-center text-[12px] text-gray-500">
          Copyright © 2025 Signage System. All rights reserved. Version 1.0
        </p>
      </div>
    </div>
  );
}

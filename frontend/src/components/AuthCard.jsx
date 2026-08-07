import React, { useState } from 'react';
import axios from 'axios';

export default function AuthCard({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        await axios.post('http://localhost:8080/api/auth/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        setIsRegistering(false);
        alert('Registration successful! Please sign in.');
      } else {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          usernameOrEmail: formData.username,
          password: formData.password
        });
        
        localStorage.setItem('jwt_token', response.data.token);
        localStorage.setItem('username', formData.username);
        onLoginSuccess();
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Authentication failed. Please check your inputs.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0718] p-4">
      {/* Auth Box Card */}
      <div className="p-8 rounded-2xl bg-[#120e26] border border-[#2a214a] w-96 shadow-2xl backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          {isRegistering ? 'Register to start tracking weather' : 'Sign in to access your elite weather telemetry'}
        </p>

        {error && <div className="mb-4 text-xs text-red-400 bg-red-950/50 p-2 rounded border border-red-800">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1a1532] border border-[#372d5c] rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter username"
            />
          </div>

          {isRegistering && (
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-[#1a1532] border border-[#372d5c] rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="name@example.com"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1a1532] border border-[#372d5c] rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-95 transition duration-200 cursor-pointer"
          >
            {isRegistering ? 'Register Account' : 'Authorize & Enter'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-purple-400 font-semibold hover:underline ml-1 cursor-pointer"
          >
            {isRegistering ? 'Sign In' : 'Register'}
          </button>
        </div>
      </div>

      {/* Perfectly Aligned Bottom Copyright Footer */}
      <div className="w-full text-center text-xs text-[#64748b] mt-6 tracking-widest uppercase">
        &copy; 2026 Meghananaik. All rights reserved.
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isLoggedIn, login } = useAdmin();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/admin');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      if (login(username, password)) {
        router.push('/admin');
      } else {
        setError('Invalid username or password. Try admin/admin123');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <i className="fas fa-lock text-4xl text-blue-600 mb-4 block"></i>
            <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">Murgan Store Management</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                disabled={isLoading}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                disabled={isLoading}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
            <p className="text-gray-700 text-sm font-semibold mb-2">
              <i className="fas fa-info-circle text-blue-600 mr-2"></i>
              Demo Credentials:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><strong>Username:</strong> admin</li>
              <li><strong>Password:</strong> admin123</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useAuth, UserRole } from './AuthContext';
import { Eye, EyeOff, User, Lock, Building, Shield } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid credentials. Use admin@example.com or tenant@example.com with password "password"');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@example.com');
    } else {
      setEmail('tenant@example.com');
    }
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to your dashboard</p>
        </div>

        {/* Quick Login Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => quickLogin('admin')}
            className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
          >
            <Shield size={20} />
            <span>Login as Admin</span>
          </button>
          
          <button
            onClick={() => quickLogin('tenant')}
            className="w-full flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
          >
            <Building size={20} />
            <span>Login as Tenant</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-gray-300">
              Or enter credentials manually
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role Selection
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
                  selectedRole === 'admin'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                <Shield size={16} />
                <span>Admin</span>
              </button>
              
              <button
                type="button"
                onClick={() => setSelectedRole('tenant')}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
                  selectedRole === 'tenant'
                    ? 'bg-green-600 border-green-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                <Building size={16} />
                <span>Tenant</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Info */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Demo Credentials:</h3>
          <div className="space-y-1 text-xs text-gray-400">
            <p><strong>Admin:</strong> admin@example.com / password</p>
            <p><strong>Tenant:</strong> tenant@example.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
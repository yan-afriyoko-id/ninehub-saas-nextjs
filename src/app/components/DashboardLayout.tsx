'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import { getFilteredMenuItems } from '../config/menu';
import { 
  BarChart3, 
  Users, 
  Settings, 
  User, 
  Bell,
  Search,
  LogOut,
  Home,
  MessageSquare,
  Database,
  Shield,
  UserCheck,
  CreditCard,
  LayoutDashboard,
  Building,
  Briefcase,
  BookOpen,
  Target,
  MessageCircle
} from 'lucide-react';

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
  BarChart3,
  Users,
  MessageSquare,
  Database,
  Shield,
  UserCheck,
  CreditCard,
  Settings,
  LayoutDashboard,
  Building,
  Briefcase,
  BookOpen,
  Target,
  MessageCircle
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          <Link href="/" className="block mb-8">
            <h1 className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              Analytics Pro
            </h1>
          </Link>
          
          <nav className="space-y-2">
            {user && getFilteredMenuItems(user.roles, user.permissions).map((item) => {
              const IconComponent = iconMap[item.icon];
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {IconComponent && <IconComponent size={20} />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <Link 
              href="/"
              className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                console.log('Logout button clicked'); // Debug log
                logout();
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors mt-2"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-white">
                {user?.roles?.includes('admin') ? 'Admin Dashboard' : 'User Dashboard'}
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-300 hover:text-white">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <Link href="/dashboard/profile" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <User size={20} />
                <span>{user?.name || 'User'}</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 
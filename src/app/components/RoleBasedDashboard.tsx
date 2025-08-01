'use client';

import { useState } from 'react';
import { useAuth, UserRole } from './AuthContext';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  Settings, 
  User, 
  Bell,
  Search,
  LogOut,
  Home,
  Shield,
  Building,
  Database,
  Key,
  Crown,
  CreditCard,
  MessageSquare,
  Bot,
  FileText,
  Plus,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  permission: UserRole[];
  children?: MenuItem[];
}

export default function RoleBasedDashboard({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (!user) {
    return null;
  }

  // Define menu items based on role
  const menuItems: MenuItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BarChart3 size={20} />,
      permission: ['admin', 'tenant']
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <TrendingUp size={20} />,
      permission: ['admin', 'tenant']
    },
    {
      id: 'users',
      label: 'Users',
      icon: <Users size={20} />,
      permission: ['admin']
    },
    {
      id: 'modules',
      label: 'CRUD Modules',
      icon: <Database size={20} />,
      permission: ['admin'],
      children: [
        { id: 'permissions', label: 'CRUD Permission', icon: <Key size={20} />, permission: ['admin'] },
        { id: 'roles', label: 'CRUD Roles', icon: <Shield size={20} />, permission: ['admin'] },
        { id: 'plans', label: 'CRUD Plans', icon: <Crown size={20} />, permission: ['admin'] }
      ]
    },
    {
      id: 'crm',
      label: 'Menu ke CRM',
      icon: <MessageSquare size={20} />,
      permission: ['admin', 'tenant']
    },
    {
      id: 'ai-chat',
      label: 'Menu ke AI Chat',
      icon: <Bot size={20} />,
      permission: ['admin', 'tenant']
    },
    {
      id: 'settings',
      label: 'Menu Settings',
      icon: <Settings size={20} />,
      permission: ['admin', 'tenant']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.permission.includes(user.role)
  );

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeTab === item.id;

    return (
      <div key={item.id}>
        <button
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
            isActive 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            <span>{item.label}</span>
          </div>
          {hasChildren && (
            <div className={`transform transition-transform ${isActive ? 'rotate-180' : ''}`}>
              ▼
            </div>
          )}
        </button>
        
        {hasChildren && isActive && (
          <div className="ml-6 mt-2 space-y-1">
            {item.children?.filter(child => child.permission.includes(user.role)).map(child => (
              <button
                key={child.id}
                onClick={() => setActiveTab(child.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === child.id
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                {child.icon}
                <span>{child.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className={`p-2 rounded-lg ${user.role === 'admin' ? 'bg-blue-600' : 'bg-green-600'}`}>
              {user.role === 'admin' ? <Shield size={20} className="text-white" /> : <Building size={20} className="text-white" />}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {filteredMenuItems.map(renderMenuItem)}
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
              onClick={logout}
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
                {user.role === 'admin' ? 'Admin Dashboard' : 'Tenant Dashboard'}
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
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.role === 'admin' ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    <User size={16} className="text-white" />
                  </div>
                  <span>{user.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-gray-400">{user.email}</div>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                        Profile Settings
                      </button>
                      <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
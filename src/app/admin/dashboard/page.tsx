'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../../components/SecureRoute';
import SecureDashboard from '../../components/SecureDashboard';
import { 
  Users, 
  Building, 
  CreditCard, 
  MessageCircle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Shield,
  Database,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  PieChart,
  Target,
  Briefcase
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalTenants: number;
  totalRevenue: number;
  activeChats: number;
  systemHealth: 'good' | 'warning' | 'critical';
  recentActivities: Array<{
    id: string;
    type: 'user' | 'tenant' | 'payment' | 'system';
    message: string;
    timestamp: string;
    status: 'success' | 'warning' | 'error';
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalTenants: 0,
    totalRevenue: 0,
    activeChats: 0,
    systemHealth: 'good',
    recentActivities: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalTenants: 89,
        totalRevenue: 12500000,
        activeChats: 23,
        systemHealth: 'good',
        recentActivities: [
          {
            id: '1',
            type: 'user',
            message: 'New user registered: john.doe@company.com',
            timestamp: '2 minutes ago',
            status: 'success'
          },
          {
            id: '2',
            type: 'tenant',
            message: 'Tenant "Acme Corp" upgraded to Premium plan',
            timestamp: '15 minutes ago',
            status: 'success'
          },
          {
            id: '3',
            type: 'payment',
            message: 'Payment received: $2,500 from TechStart Inc',
            timestamp: '1 hour ago',
            status: 'success'
          },
          {
            id: '4',
            type: 'system',
            message: 'System backup completed successfully',
            timestamp: '2 hours ago',
            status: 'success'
          },
          {
            id: '5',
            type: 'user',
            message: 'User login failed: invalid credentials',
            timestamp: '3 hours ago',
            status: 'warning'
          }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusIcon = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'error':
        return <AlertTriangle className="text-red-500" size={16} />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users size={16} />;
      case 'tenant':
        return <Building size={16} />;
      case 'payment':
        return <DollarSign size={16} />;
      case 'system':
        return <Settings size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  if (isLoading) {
    return (
      <SecureRoute adminOnly={true}>
        <SecureDashboard>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </SecureDashboard>
      </SecureRoute>
    );
  }

  return (
    <SecureRoute adminOnly={true}>
      <SecureDashboard>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400">Monitor and manage your platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-900/20 border border-green-500/20 rounded-lg px-4 py-2">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-green-400 text-sm">System Healthy</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Users className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-green-500 text-sm ml-2">+12% from last month</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Tenants</p>
                  <p className="text-2xl font-bold text-white">{stats.totalTenants}</p>
                </div>
                <div className="bg-green-600 p-3 rounded-lg">
                  <Building className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-green-500 text-sm ml-2">+5 new this month</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <div className="bg-yellow-600 p-3 rounded-lg">
                  <DollarSign className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-green-500 text-sm ml-2">+8% from last month</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Chats</p>
                  <p className="text-2xl font-bold text-white">{stats.activeChats}</p>
                </div>
                <div className="bg-purple-600 p-3 rounded-lg">
                  <MessageCircle className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingDown className="text-red-500" size={16} />
                <span className="text-red-500 text-sm ml-2">-3 from yesterday</span>
              </div>
            </div>
          </div>

          {/* Charts and Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <Users size={20} className="text-white" />
                    <span className="text-white">Manage Users</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                    <Building size={20} className="text-white" />
                    <span className="text-white">Manage Tenants</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                    <CreditCard size={20} className="text-white" />
                    <span className="text-white">Manage Plans</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors">
                    <Database size={20} className="text-white" />
                    <span className="text-white">System Settings</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {stats.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(activity.status)}
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.message}</p>
                        <p className="text-gray-400 text-xs">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">API Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">AI Chat Service</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Backup Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm">Completed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Security Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Failed Login Attempts</span>
                  <span className="text-yellow-500 text-sm">3 (Last 24h)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Sessions</span>
                  <span className="text-green-500 text-sm">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">SSL Certificate</span>
                  <span className="text-green-500 text-sm">Valid</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Firewall Status</span>
                  <span className="text-green-500 text-sm">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
} 
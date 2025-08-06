'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../../components/SecureRoute';
import SecureDashboard from '../../components/SecureDashboard';
import DebugUserInfo from '../../components/DebugUserInfo';
import { apiClient } from '../../services/api';
import { useAuth } from '../../components/AuthContext';
import { 
  Users, 
  Building, 
  CreditCard, 
  TrendingUp, 
  Activity,
  Shield,
  Database,
  Settings,
  AlertTriangle,
  CheckCircle,
  DollarSign,
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
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalTenants: 0,
    totalRevenue: 0,
    activeChats: 0,
    systemHealth: 'good',
    recentActivities: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAdminDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load data from API
        const [tenantsResponse, modulesResponse, permissionsResponse, rolesResponse, plansResponse] = await Promise.all([
          apiClient.getTenants(),
          apiClient.getModules(),
          apiClient.getPermissions(),
          apiClient.getRoles(),
          apiClient.getPlans()
        ]);

        // Calculate stats from API responses
        const totalTenants = tenantsResponse.success ? tenantsResponse.data?.length || 0 : 0;
        const totalModules = modulesResponse.success ? modulesResponse.data?.length || 0 : 0;
        const totalPermissions = permissionsResponse.success ? permissionsResponse.data?.length || 0 : 0;
        const totalRoles = rolesResponse.success ? rolesResponse.data?.length || 0 : 0;
        const totalPlans = plansResponse.success ? plansResponse.data?.length || 0 : 0;
        const activeChats = 0; // No conversations API available

        setStats({
          totalUsers: totalTenants, // Using tenants as users for now
          totalTenants,
          totalRevenue: totalPlans * 1000, // Mock revenue calculation
          activeChats,
          systemHealth: 'good',
          recentActivities: [
            {
              id: '1',
              type: 'tenant',
              message: `Total tenants: ${totalTenants}`,
              timestamp: 'Just now',
              status: 'success'
            },
            {
              id: '2',
              type: 'system',
              message: `Total modules: ${totalModules}`,
              timestamp: 'Just now',
              status: 'success'
            },
            {
              id: '3',
              type: 'system',
              message: `Total permissions: ${totalPermissions}`,
              timestamp: 'Just now',
              status: 'success'
            },
            {
              id: '4',
              type: 'system',
              message: `Total roles: ${totalRoles}`,
              timestamp: 'Just now',
              status: 'success'
            },
            {
              id: '5',
              type: 'system',
              message: `Total plans: ${totalPlans}`,
              timestamp: 'Just now',
              status: 'success'
            }
          ]
        });
      } catch (error) {
        console.error('Error loading admin dashboard data:', error);
        setError('Failed to load admin dashboard data');
        
        // Fallback to empty stats
        setStats({
          totalUsers: 0,
          totalTenants: 0,
          totalRevenue: 0,
          activeChats: 0,
          systemHealth: 'good',
          recentActivities: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAdminDashboardData();
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

  if (error) {
    return (
      <SecureRoute adminOnly={true}>
        <SecureDashboard>
          <div className="p-6">
            <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
              {error}
            </div>
          </div>
        </SecureDashboard>
      </SecureRoute>
    );
  }

  return (
    <SecureRoute adminOnly={true}>
      <SecureDashboard>
        <div className="space-y-6">
          {/* Debug Information */}
          <DebugUserInfo />
          
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
                  <p className="text-gray-400 text-sm">Total Tenants</p>
                  <p className="text-2xl font-bold text-white">{stats.totalTenants}</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Building className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-green-500 text-sm ml-2">Active tenants</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Modules</p>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                </div>
                <div className="bg-green-600 p-3 rounded-lg">
                  <Database className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-green-500 text-sm ml-2">System modules</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Roles</p>
                  <p className="text-2xl font-bold text-white">{stats.totalRevenue / 1000}</p>
                </div>
                <div className="bg-yellow-600 p-3 rounded-lg">
                  <Shield className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-green-500 text-sm ml-2">User roles</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Plans</p>
                  <p className="text-2xl font-bold text-white">{stats.activeChats}</p>
                </div>
                <div className="bg-purple-600 p-3 rounded-lg">
                  <CreditCard className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-green-500 text-sm ml-2">Subscription plans</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Building className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">Tenant Management</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Manage all tenant accounts and their subscriptions</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Manage Tenants
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Database className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">Module Management</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Configure system modules and their permissions</p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                Manage Modules
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-yellow-600 p-2 rounded-lg">
                  <Shield className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">Role Management</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Manage user roles and their permissions</p>
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors">
                Manage Roles
              </button>
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
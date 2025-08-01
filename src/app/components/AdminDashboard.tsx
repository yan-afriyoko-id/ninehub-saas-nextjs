'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab] = useState('overview');
  
  // Dummy data
  
  const chartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 90 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 95 },
    { month: 'Jun', value: 88 }
  ];

  const pieData = [
    { label: 'Desktop', value: 45, color: '#3B82F6' },
    { label: 'Mobile', value: 35, color: '#10B981' },
    { label: 'Tablet', value: 20, color: '#F59E0B' }
  ];

  // Dummy data for CRUD tables
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Tenant', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Tenant', status: 'Inactive', lastLogin: '2024-01-10' },
  ];

  const permissions = [
    { id: 1, name: 'User Management', description: 'Manage user accounts', module: 'Users', status: 'Active' },
    { id: 2, name: 'Role Management', description: 'Manage user roles', module: 'Roles', status: 'Active' },
    { id: 3, name: 'Plan Management', description: 'Manage subscription plans', module: 'Plans', status: 'Active' },
  ];

  const roles = [
    { id: 1, name: 'Super Admin', description: 'Full system access', permissions: 15, users: 2, status: 'Active' },
    { id: 2, name: 'Admin', description: 'Administrative access', permissions: 10, users: 5, status: 'Active' },
    { id: 3, name: 'Tenant', description: 'Limited access', permissions: 5, users: 25, status: 'Active' },
  ];

  const plans = [
    { id: 1, name: 'Basic Plan', price: '$9.99', features: 5, users: 10, status: 'Active' },
    { id: 2, name: 'Pro Plan', price: '$29.99', features: 15, users: 50, status: 'Active' },
    { id: 3, name: 'Enterprise', price: '$99.99', features: 50, users: 200, status: 'Active' },
  ];

  const renderCRUDTable = (data: Record<string, unknown>[], columns: string[], title: string) => (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus size={16} />
            <span>Add New</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-white">
              <Filter size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white">
              <Download size={16} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="py-3 px-4 font-medium">{column}</th>
                ))}
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {data.map((item, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                  {Object.values(item).slice(0, -1).map((value, valueIndex) => (
                    <td key={valueIndex} className="py-3 px-4">
                      {typeof value === 'string' && value.includes('@') ? (
                        <span className="text-blue-400">{value}</span>
                      ) : typeof value === 'string' && value.includes('$') ? (
                        <span className="text-green-400 font-medium">{value}</span>
                      ) : typeof value === 'string' && value === 'Active' ? (
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">Active</span>
                      ) : typeof value === 'string' && value === 'Inactive' ? (
                        <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">Inactive</span>
                      ) : (
                        String(value)
                      )}
                    </td>
                  ))}
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300">
                        <Eye size={14} />
                      </button>
                      <button className="p-1 text-yellow-400 hover:text-yellow-300">
                        <Edit size={14} />
                      </button>
                      <button className="p-1 text-red-400 hover:text-red-300">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {activeTab === 'overview' && (
        <>
          {/* Subscription Status */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Admin Dashboard</h3>
                <p className="text-blue-100">Welcome back, {user?.name}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Calendar size={16} />
                  <span>Last login: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-300">
                  System Active
                </div>
                <button className="mt-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                  View System Status
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                  <p className="text-green-400 text-sm">+12% from last month</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Users className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Tenants</p>
                  <p className="text-2xl font-bold text-white">89</p>
                  <p className="text-green-400 text-sm">+8% from last month</p>
                </div>
                <div className="bg-green-600 p-3 rounded-lg">
                  <TrendingUp className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Revenue</p>
                  <p className="text-2xl font-bold text-white">$145,231</p>
                  <p className="text-green-400 text-sm">+15% from last month</p>
                </div>
                <div className="bg-purple-600 p-3 rounded-lg">
                  <BarChart3 className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">System Health</p>
                  <p className="text-2xl font-bold text-white">99.9%</p>
                  <p className="text-green-400 text-sm">All systems operational</p>
                </div>
                <div className="bg-orange-600 p-3 rounded-lg">
                  <PieChart className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">User Growth</h3>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white">
                    <Filter size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <div className="h-64 flex items-end space-x-2">
                {chartData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                      style={{ height: `${(data.value / 100) * 200}px` }}
                    ></div>
                    <span className="text-gray-400 text-sm mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">User Distribution</h3>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white">
                    <Filter size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center h-64">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="4"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * 0.55}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold">1,247</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        renderCRUDTable(users, ['Name', 'Email', 'Role', 'Status', 'Last Login'], 'User Management')
      )}

      {activeTab === 'permissions' && (
        renderCRUDTable(permissions, ['Name', 'Description', 'Module', 'Status'], 'Permission Management')
      )}

      {activeTab === 'roles' && (
        renderCRUDTable(roles, ['Name', 'Description', 'Permissions', 'Users', 'Status'], 'Role Management')
      )}

      {activeTab === 'plans' && (
        renderCRUDTable(plans, ['Name', 'Price', 'Features', 'Users', 'Status'], 'Plan Management')
      )}

      {activeTab === 'crm' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">CRM System</h3>
          <p className="text-gray-300">CRM functionality will be integrated here.</p>
        </div>
      )}

      {activeTab === 'ai-chat' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">AI Chat System</h3>
          <p className="text-gray-300">AI Chat functionality will be integrated here.</p>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">System Settings</h3>
          <p className="text-gray-300">System configuration and settings will be displayed here.</p>
        </div>
      )}
    </div>
  );
} 
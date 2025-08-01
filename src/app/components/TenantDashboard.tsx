'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';
import { 
  PieChart, 
  Users, 
  Calendar,
  MessageSquare,
  Target,
  Activity,
  Filter,
  Download,
  Bot
} from 'lucide-react';

export default function TenantDashboard() {
  const { user } = useAuth();
  const [activeTab] = useState('overview');
  
  // Dummy data for tenant
  const subscriptionEndDate = new Date('2025-03-15');
  const daysUntilExpiry = Math.ceil((subscriptionEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const chartData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 61 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 58 }
  ];

  const pieData = [
    { label: 'Completed', value: 65, color: '#10B981' },
    { label: 'In Progress', value: 25, color: '#F59E0B' },
    { label: 'Pending', value: 10, color: '#EF4444' }
  ];

  // Tenant-specific data
  const tenantStats = {
    totalProjects: 12,
    activeProjects: 8,
    completedProjects: 4,
    teamMembers: 5,
    monthlyUsage: '75%',
    storageUsed: '2.5 GB',
    storageLimit: '10 GB'
  };

  const recentActivities = [
    { id: 1, action: 'Project "Website Redesign" updated', time: '2 hours ago', type: 'update' },
    { id: 2, action: 'New team member "Sarah" added', time: '1 day ago', type: 'add' },
    { id: 3, action: 'Storage usage increased to 75%', time: '2 days ago', type: 'warning' },
    { id: 4, action: 'Project "Mobile App" completed', time: '3 days ago', type: 'complete' },
  ];

  return (
    <div className="space-y-6">
      {activeTab === 'overview' && (
        <>
          {/* Subscription Status */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Tenant Dashboard</h3>
                <p className="text-green-100">Welcome back, {user?.name}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Calendar size={16} />
                  <span>Plan expires: {subscriptionEndDate.toLocaleDateString()}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${daysUntilExpiry <= 30 ? 'text-yellow-300' : 'text-green-300'}`}>
                  {daysUntilExpiry} days left
                </div>
                <button className="mt-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Projects</p>
                  <p className="text-2xl font-bold text-white">{tenantStats.totalProjects}</p>
                  <p className="text-green-400 text-sm">{tenantStats.activeProjects} active</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Target className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Team Members</p>
                  <p className="text-2xl font-bold text-white">{tenantStats.teamMembers}</p>
                  <p className="text-green-400 text-sm">All active</p>
                </div>
                <div className="bg-green-600 p-3 rounded-lg">
                  <Users className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Storage Usage</p>
                  <p className="text-2xl font-bold text-white">{tenantStats.storageUsed}</p>
                  <p className="text-blue-400 text-sm">of {tenantStats.storageLimit}</p>
                </div>
                <div className="bg-purple-600 p-3 rounded-lg">
                  <Activity className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Usage</p>
                  <p className="text-2xl font-bold text-white">{tenantStats.monthlyUsage}</p>
                  <p className="text-green-400 text-sm">Within limits</p>
                </div>
                <div className="bg-orange-600 p-3 rounded-lg">
                  <PieChart className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Chart */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Project Activity</h3>
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
                      className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                      style={{ height: `${(data.value / 100) * 200}px` }}
                    ></div>
                    <span className="text-gray-400 text-sm mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
                <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'update' ? 'bg-blue-400' :
                      activity.type === 'add' ? 'bg-green-400' :
                      activity.type === 'warning' ? 'bg-yellow-400' :
                      'bg-purple-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm">{activity.action}</p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Progress */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Project Progress</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm">View All Projects</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pieData.map((item, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">{item.label}</span>
                    <span className="text-white font-medium">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${item.value}%`, 
                        backgroundColor: item.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Analytics</h3>
          <p className="text-gray-300">Tenant-specific analytics and insights will be displayed here.</p>
        </div>
      )}

      {activeTab === 'crm' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">CRM System</h3>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <MessageSquare size={16} />
              <span>New Contact</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Contacts</p>
                  <p className="text-white font-semibold">156</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Target size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active Leads</p>
                  <p className="text-white font-semibold">23</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Activity size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Conversions</p>
                  <p className="text-white font-semibold">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai-chat' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">AI Chat Assistant</h3>
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Bot size={16} />
              <span>Start Chat</span>
            </button>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-medium">AI Assistant</p>
                <p className="text-gray-400 text-sm">Online • Ready to help</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Hi! I&apos;m your AI assistant. I can help you with project management, 
              customer inquiries, and general questions about your dashboard.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left text-gray-300 hover:text-white text-sm p-2 rounded hover:bg-gray-600">
                  • Create new project
                </button>
                <button className="w-full text-left text-gray-300 hover:text-white text-sm p-2 rounded hover:bg-gray-600">
                  • Add team member
                </button>
                <button className="w-full text-left text-gray-300 hover:text-white text-sm p-2 rounded hover:bg-gray-600">
                  • Generate report
                </button>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Recent Conversations</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Project timeline questions</p>
                <p>• Team member permissions</p>
                <p>• Storage usage optimization</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Tenant Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Account Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan:</span>
                    <span className="text-green-400">Pro Plan</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Usage Limits</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Storage:</span>
                    <span className="text-white">{tenantStats.storageUsed} / {tenantStats.storageLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Team Members:</span>
                    <span className="text-white">{tenantStats.teamMembers} / 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Projects:</span>
                    <span className="text-white">{tenantStats.totalProjects} / 20</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Notifications</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-gray-300 text-sm">Email notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-gray-300 text-sm">Project updates</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300 text-sm">Marketing emails</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Security</h4>
                <div className="space-y-3">
                  <button className="w-full text-left text-gray-300 hover:text-white text-sm">
                    Change Password
                  </button>
                  <button className="w-full text-left text-gray-300 hover:text-white text-sm">
                    Two-Factor Authentication
                  </button>
                  <button className="w-full text-left text-gray-300 hover:text-white text-sm">
                    Login History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
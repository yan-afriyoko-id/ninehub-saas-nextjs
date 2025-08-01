'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Dummy data
  const subscriptionEndDate = new Date('2025-03-15');
  const daysUntilExpiry = Math.ceil((subscriptionEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
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

  return (
    <DashboardLayout>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Subscription Status */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Subscription Status</h3>
                    <p className="text-blue-100">Premium Plan</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Calendar size={16} />
                      <span>Expires: {subscriptionEndDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${daysUntilExpiry <= 30 ? 'text-yellow-300' : 'text-green-300'}`}>
                      {daysUntilExpiry} days left
                    </div>
                    <button className="mt-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                      Renew Now
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
                      <p className="text-2xl font-bold text-white">12,847</p>
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
                      <p className="text-gray-400 text-sm">Revenue</p>
                      <p className="text-2xl font-bold text-white">$45,231</p>
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
                      <p className="text-gray-400 text-sm">Sessions</p>
                      <p className="text-2xl font-bold text-white">89,234</p>
                      <p className="text-red-400 text-sm">-3% from last month</p>
                    </div>
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <BarChart3 className="text-white" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Conversion</p>
                      <p className="text-2xl font-bold text-white">2.4%</p>
                      <p className="text-green-400 text-sm">+0.5% from last month</p>
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
                    <h3 className="text-lg font-semibold text-white">Monthly Growth</h3>
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
                    <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
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
                        <span className="text-white font-semibold">45%</span>
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
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Analytics</h3>
              <p className="text-gray-300">Analytics content will be displayed here.</p>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Users</h3>
              <p className="text-gray-300">User management content will be displayed here.</p>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Reports</h3>
              <p className="text-gray-300">Reports content will be displayed here.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
              <p className="text-gray-300">Settings content will be displayed here.</p>
            </div>
                     )}
     </DashboardLayout>
   );
 } 
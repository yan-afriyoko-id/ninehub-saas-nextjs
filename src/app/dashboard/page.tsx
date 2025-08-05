'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import OverviewCard from '../components/dashboard/OverviewCard';
import SubscriptionCard from '../components/dashboard/SubscriptionCard';
import ChartCard from '../components/dashboard/ChartCard';
import BarChart from '../components/dashboard/BarChart';
import PieChart from '../components/dashboard/PieChart';
import DataTable from '../components/dashboard/DataTable';
import FormCard from '../components/dashboard/FormCard';
import FormField from '../components/dashboard/FormField';
import RoleBasedContent from '../components/dashboard/RoleBasedContent';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Users,
  Loader2
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  revenue: number;
  sessions: number;
  conversion: number;
  userGrowth: number;
  revenueGrowth: number;
  sessionGrowth: number;
  conversionGrowth: number;
}

interface DashboardData {
  stats: DashboardStats;
  chartData: Array<{ month: string; value: number }>;
  pieData: Array<{ label: string; value: number; color: string }>;
  recentUsers: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
  }>;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Use dummy subscription data since user doesn't have subscription field
  const subscriptionEndDate = new Date('2025-03-15');
  const daysUntilExpiry = Math.ceil((subscriptionEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  // Load dashboard data with dummy data
  useEffect(() => {
    const loadDashboardData = () => {
      try {
        setLoading(true);
        setError('');
        
        // Dummy dashboard data
        const dummyData: DashboardData = {
          stats: {
            totalUsers: 1247,
            revenue: 45678,
            sessions: 8923,
            conversion: 3.2,
            userGrowth: 12.5,
            revenueGrowth: 8.3,
            sessionGrowth: 15.7,
            conversionGrowth: -0.5
          },
          chartData: [
            { month: 'Jan', value: 1200 },
            { month: 'Feb', value: 1350 },
            { month: 'Mar', value: 1420 },
            { month: 'Apr', value: 1580 },
            { month: 'May', value: 1650 },
            { month: 'Jun', value: 1800 }
          ],
          pieData: [
            { label: 'Direct', value: 45, color: '#3B82F6' },
            { label: 'Organic', value: 30, color: '#10B981' },
            { label: 'Referral', value: 15, color: '#F59E0B' },
            { label: 'Social', value: 10, color: '#EF4444' }
          ],
          recentUsers: [
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Tenant', status: 'Inactive' },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' }
          ]
        };

        setDashboardData(dummyData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Load data immediately, don't wait for user
    loadDashboardData();
  }, []);



  const userColumns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  const handleRenewSubscription = () => {
    alert('Redirecting to payment page...');
  };

  const handleDownloadChart = () => {
    alert('Downloading chart data...');
  };

  const handleFilterChart = () => {
    alert('Opening filter options...');
  };

  const handleUserRowClick = (user: Record<string, unknown>) => {
    alert(`Viewing details for ${user.name}`);
  };

  // Use API data only
  const stats = dashboardData?.stats || {
    totalUsers: 0,
    revenue: 0,
    sessions: 0,
    conversion: 0,
    userGrowth: 0,
    revenueGrowth: 0,
    sessionGrowth: 0,
    conversionGrowth: 0
  };

  const chartData = dashboardData?.chartData || [];
  const pieData = dashboardData?.pieData || [];
  const userTableData = dashboardData?.recentUsers || [];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Subscription Status */}
          <SubscriptionCard
            plan="Premium"
            endDate={subscriptionEndDate}
            daysLeft={daysUntilExpiry}
            onRenew={handleRenewSubscription}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <OverviewCard
              title="Total Users"
              value={stats.totalUsers.toLocaleString()}
              change={`${stats.userGrowth > 0 ? '+' : ''}${stats.userGrowth}% from last month`}
              changeType={stats.userGrowth >= 0 ? "positive" : "negative"}
              icon={Users}
              iconColor="#3B82F6"
            />
            
            <OverviewCard
              title="Revenue"
              value={`$${stats.revenue.toLocaleString()}`}
              change={`${stats.revenueGrowth > 0 ? '+' : ''}${stats.revenueGrowth}% from last month`}
              changeType={stats.revenueGrowth >= 0 ? "positive" : "negative"}
              icon={TrendingUp}
              iconColor="#10B981"
            />
            
            <OverviewCard
              title="Sessions"
              value={stats.sessions.toLocaleString()}
              change={`${stats.sessionGrowth > 0 ? '+' : ''}${stats.sessionGrowth}% from last month`}
              changeType={stats.sessionGrowth >= 0 ? "positive" : "negative"}
              icon={BarChart3}
              iconColor="#8B5CF6"
            />
            
            <OverviewCard
              title="Conversion"
              value={`${stats.conversion}%`}
              change={`${stats.conversionGrowth > 0 ? '+' : ''}${stats.conversionGrowth}% from last month`}
              changeType={stats.conversionGrowth >= 0 ? "positive" : "negative"}
              icon={PieChartIcon}
              iconColor="#F59E0B"
            />
          </div>

          {/* Charts */}
          {chartData.length > 0 && pieData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard 
                title="Monthly Growth"
                onDownload={handleDownloadChart}
                onFilter={handleFilterChart}
              >
                <BarChart data={chartData} />
              </ChartCard>

              <ChartCard 
                title="Traffic Sources"
                onDownload={handleDownloadChart}
                onFilter={handleFilterChart}
              >
                <PieChart data={pieData} />
              </ChartCard>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-300 text-center">No chart data available</p>
            </div>
          )}

          {/* Recent Users Table */}
          {userTableData.length > 0 ? (
            <DataTable
              columns={userColumns}
              data={userTableData}
              title="Recent Users"
              onRowClick={handleUserRowClick}
            />
          ) : (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-300 text-center">No user data available</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Analytics Dashboard</h3>
            <p className="text-gray-300 mb-4">Detailed analytics and insights will be displayed here.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Page Views</h4>
                <p className="text-2xl font-bold text-blue-400">1,234</p>
                <p className="text-green-400 text-sm">+15% vs last week</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Bounce Rate</h4>
                <p className="text-2xl font-bold text-orange-400">23.4%</p>
                <p className="text-red-400 text-sm">+2% vs last week</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Avg. Session</h4>
                <p className="text-2xl font-bold text-green-400">4m 32s</p>
                <p className="text-green-400 text-sm">+8% vs last week</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">User Management</h3>
            <p className="text-gray-300 mb-4">Manage your users and their permissions.</p>
            
            <DataTable
              columns={userColumns}
              data={userTableData}
              title="All Users"
              onRowClick={handleUserRowClick}
            />
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Reports & Analytics</h3>
            <p className="text-gray-300 mb-4">Generate and view detailed reports.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Monthly Report</h4>
                <p className="text-gray-300 text-sm mb-3">Comprehensive monthly analytics</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Generate Report
                </button>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Custom Report</h4>
                <p className="text-gray-300 text-sm mb-3">Create custom analytics report</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Create Custom
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <RoleBasedContent
          userRole={user?.roles?.includes('admin') ? 'admin' : 'user'}
          adminContent={
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Admin Settings</h3>
                <p className="text-gray-300 mb-4">Full system administration and user management.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">User Management</h4>
                      <p className="text-gray-400 text-sm">Manage all users and permissions</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Manage Users
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">System Configuration</h4>
                      <p className="text-gray-400 text-sm">Configure system-wide settings</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Configure
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Data Management</h4>
                      <p className="text-gray-400 text-sm">Export and manage all data</p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Manage Data
                    </button>
                  </div>
                </div>
              </div>

              {/* Admin Form */}
              <FormCard 
                title="Add New User" 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('User added successfully!');
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Full Name"
                    name="fullName"
                    type="text"
                    placeholder="Enter full name"
                    required
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />
                  <FormField
                    label="Role"
                    name="role"
                    type="select"
                    options={[
                      { value: 'admin', label: 'Administrator' },
                      { value: 'user', label: 'User' },
                      { value: 'tenant', label: 'Tenant' }
                    ]}
                    required
                  />
                  <FormField
                    label="Department"
                    name="department"
                    type="text"
                    placeholder="Enter department"
                  />
                </div>
                <FormField
                  label="Notes"
                  name="notes"
                  type="textarea"
                  placeholder="Enter additional notes"
                  rows={3}
                />
              </FormCard>
            </div>
          }
          userContent={
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">User Settings</h3>
                <p className="text-gray-300 mb-4">Configure your account and preferences.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Email Notifications</h4>
                      <p className="text-gray-400 text-sm">Receive email updates</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Configure
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">API Access</h4>
                      <p className="text-gray-400 text-sm">Manage API keys and access</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Manage
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Data Export</h4>
                      <p className="text-gray-400 text-sm">Export your data</p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Export
                    </button>
                  </div>
                </div>
              </div>

              {/* User Form */}
              <FormCard 
                title="Update Profile" 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Profile updated successfully!');
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Full Name"
                    name="fullName"
                    type="text"
                    placeholder="Enter full name"
                    required
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />
                  <FormField
                    label="Department"
                    name="department"
                    type="text"
                    placeholder="Enter department"
                  />
                  <FormField
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                  />
                </div>
                <FormField
                  label="Bio"
                  name="bio"
                  type="textarea"
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              </FormCard>
            </div>
          }
          tenantContent={
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Basic Settings</h3>
                <p className="text-gray-300 mb-4">Manage your basic account settings.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Profile Settings</h4>
                      <p className="text-gray-400 text-sm">Update your profile information</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Update
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Subscription</h4>
                      <p className="text-gray-400 text-sm">Manage your subscription</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
              </div>

              {/* Tenant Form */}
              <FormCard 
                title="Basic Profile" 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Profile updated successfully!');
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Full Name"
                    name="fullName"
                    type="text"
                    placeholder="Enter full name"
                    required
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <FormField
                  label="Company"
                  name="company"
                  type="text"
                  placeholder="Enter company name"
                />
              </FormCard>
            </div>
          }
        />
      )}
    </DashboardLayout>
  );
} 
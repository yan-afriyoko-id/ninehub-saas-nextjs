'use client';

import { useState } from 'react';
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
import ImageCard from '../components/dashboard/ImageCard';
import RoleBasedContent from '../components/dashboard/RoleBasedContent';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Users
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Use user data if available, otherwise use dummy data
  const subscriptionEndDate = user?.subscription?.endDate 
    ? new Date(user.subscription.endDate) 
    : new Date('2025-03-15');
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

  const userTableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active' },
  ];

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

  const handleUserRowClick = (user: any) => {
    alert(`Viewing details for ${user.name}`);
  };

  return (
    <DashboardLayout>
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Subscription Status */}
          <SubscriptionCard
            plan={user?.subscription?.plan || "Premium"}
            endDate={subscriptionEndDate}
            daysLeft={daysUntilExpiry}
            onRenew={handleRenewSubscription}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <OverviewCard
              title="Total Users"
              value="12,847"
              change="+12% from last month"
              changeType="positive"
              icon={Users}
              iconColor="#3B82F6"
            />
            
            <OverviewCard
              title="Revenue"
              value="$45,231"
              change="+8% from last month"
              changeType="positive"
              icon={TrendingUp}
              iconColor="#10B981"
            />
            
            <OverviewCard
              title="Sessions"
              value="89,234"
              change="-3% from last month"
              changeType="negative"
              icon={BarChart3}
              iconColor="#8B5CF6"
            />
            
            <OverviewCard
              title="Conversion"
              value="2.4%"
              change="+0.5% from last month"
              changeType="positive"
              icon={PieChartIcon}
              iconColor="#F59E0B"
            />
          </div>

          {/* Charts */}
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

          {/* Recent Users Table */}
          <DataTable
            columns={userColumns}
            data={userTableData}
            title="Recent Users"
            onRowClick={handleUserRowClick}
          />
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
          userRole={user?.role || 'user'}
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
'use client';

import { useAuth } from '../components/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

export default function CRMPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Customer Relationship Management</h3>
          <p className="text-gray-300 mb-4">
            {user?.role === 'admin' 
              ? 'Manage all customer relationships and data across the platform.'
              : 'View and manage your customer relationships.'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Total Customers</h4>
              <p className="text-2xl font-bold text-blue-400">
                {user?.role === 'admin' ? '2,847' : '156'}
              </p>
              <p className="text-green-400 text-sm">+12% from last month</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Active Leads</h4>
              <p className="text-2xl font-bold text-green-400">
                {user?.role === 'admin' ? '1,234' : '45'}
              </p>
              <p className="text-green-400 text-sm">+8% from last month</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Conversion Rate</h4>
              <p className="text-2xl font-bold text-purple-400">
                {user?.role === 'admin' ? '15.4%' : '8.2%'}
              </p>
              <p className="text-green-400 text-sm">+2.1% from last month</p>
            </div>
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Admin CRM Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Customer Analytics</h4>
                <p className="text-gray-300 text-sm mb-3">Advanced analytics and insights</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  View Analytics
                </button>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Lead Management</h4>
                <p className="text-gray-300 text-sm mb-3">Manage and track all leads</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Manage Leads
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div>
                <p className="text-white font-medium">New customer registered</p>
                <p className="text-gray-400 text-sm">John Doe - 2 hours ago</p>
              </div>
              <span className="text-green-400 text-sm">New</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div>
                <p className="text-white font-medium">Lead converted to customer</p>
                <p className="text-gray-400 text-sm">Jane Smith - 4 hours ago</p>
              </div>
              <span className="text-blue-400 text-sm">Converted</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div>
                <p className="text-white font-medium">Follow-up scheduled</p>
                <p className="text-gray-400 text-sm">Bob Johnson - 6 hours ago</p>
              </div>
              <span className="text-yellow-400 text-sm">Scheduled</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
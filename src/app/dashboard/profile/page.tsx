'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../components/AuthContext';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Shield,
  Bell,
  Globe,
  Key,
  Trash2,
  Edit,
  Save,
  X
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Use logged in user data or fallback to dummy data
  const userData = user || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    company: 'Tech Solutions Inc.',
    role: 'Senior Developer',
    joinDate: '2023-01-15',
    subscription: {
      plan: 'Premium',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2025-03-15',
      price: '$99/month'
    }
  };

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
    company: userData.company
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      location: userData.location,
      company: userData.company
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Link 
            href="/dashboard"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {isEditing ? <X size={16} /> : <Edit size={16} />}
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 text-white">
                        <User size={16} />
                        <span>{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 text-white">
                        <Mail size={16} />
                        <span>{user.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 text-white">
                        <Phone size={16} />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 text-white">
                        <MapPin size={16} />
                        <span>{user.location}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Company</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 text-white">
                        <span>{user.company}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Role</label>
                    <div className="flex items-center space-x-3 text-white">
                      <span>{user.role}</span>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Save size={16} />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield size={20} className="text-blue-400" />
                    <div>
                      <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Enable
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell size={20} className="text-green-400" />
                    <div>
                      <h3 className="text-white font-medium">Notifications</h3>
                      <p className="text-gray-400 text-sm">Manage your notification preferences</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-purple-400" />
                    <div>
                      <h3 className="text-white font-medium">Language & Region</h3>
                      <p className="text-gray-400 text-sm">Set your preferred language</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    English (US)
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Key size={20} className="text-yellow-400" />
                    <div>
                      <h3 className="text-white font-medium">API Keys</h3>
                      <p className="text-gray-400 text-sm">Manage your API access keys</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-gray-800 rounded-xl p-6 border border-red-500/20">
              <h2 className="text-xl font-semibold text-white mb-6">Danger Zone</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="flex items-center space-x-3">
                    <Trash2 size={20} className="text-red-400" />
                    <div>
                      <h3 className="text-white font-medium">Delete Account</h3>
                      <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{userData.name}</h3>
                <p className="text-gray-400">{userData.role}</p>
                <p className="text-gray-400 text-sm">{userData.company}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Calendar size={16} />
                  <span className="text-sm">Joined {new Date(userData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail size={16} />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin size={16} />
                  <span className="text-sm">{userData.location}</span>
                </div>
              </div>
            </div>

            {/* Subscription Info */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Subscription</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Plan</span>
                  <span className="text-white font-medium">{userData.subscription.plan}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-medium">{userData.subscription.status}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Price</span>
                  <span className="text-white font-medium">{userData.subscription.price}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Start Date</span>
                  <span className="text-white">{new Date(userData.subscription.startDate).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">End Date</span>
                  <span className="text-white">{new Date(userData.subscription.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  Manage Subscription
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <CreditCard size={16} className="text-blue-400" />
                    <span className="text-white">Billing & Payments</span>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield size={16} className="text-green-400" />
                    <span className="text-white">Security Settings</span>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Bell size={16} className="text-purple-400" />
                    <span className="text-white">Notification Preferences</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
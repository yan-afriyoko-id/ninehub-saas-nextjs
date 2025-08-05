'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../components/SecureRoute';
import SecureDashboard from '../components/SecureDashboard';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Edit,
  Save,
  X,
  Camera,
  Settings,
  Users,
  Shield,
  CreditCard,
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  logo: string;
  industry: string;
  size: string;
  founded: string;
  description: string;
  status: 'active' | 'inactive';
  subscription: {
    plan: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'cancelled';
  };
  settings: {
    timezone: string;
    language: string;
    currency: string;
    dateFormat: string;
    notifications: boolean;
    autoBackup: boolean;
    twoFactorAuth: boolean;
  };
}

export default function CompanySettingsPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Company>>({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyCompany: Company = {
        id: '1',
        name: 'NineHub Corporation',
        email: 'info@ninehub.com',
        phone: '+6281234567890',
        website: 'https://ninehub.com',
        address: 'Jl. Business No. 1, Jakarta, Indonesia',
        logo: 'https://ui-avatars.com/api/?name=NineHub&background=0D9488&color=fff',
        industry: 'Technology',
        size: '50-100 employees',
        founded: '2020-01-01',
        description: 'Leading multi-tenant SaaS platform providing comprehensive business solutions for modern enterprises.',
        status: 'active',
        subscription: {
          plan: 'Enterprise Plan',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          status: 'active'
        },
        settings: {
          timezone: 'Asia/Jakarta',
          language: 'en',
          currency: 'IDR',
          dateFormat: 'DD/MM/YYYY',
          notifications: true,
          autoBackup: true,
          twoFactorAuth: true
        }
      };
      setCompany(dummyCompany);
      setEditForm(dummyCompany);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    if (company) {
      setCompany({ ...company, ...editForm });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (company) {
      setEditForm(company);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-500' : 'text-red-500';
  };

  const getSubscriptionColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600';
      case 'expired':
        return 'bg-red-600';
      case 'cancelled':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (isLoading) {
    return (
      <SecureRoute>
        <SecureDashboard>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </SecureDashboard>
      </SecureRoute>
    );
  }

  if (!company) {
    return (
      <SecureRoute>
        <SecureDashboard>
          <div className="text-center py-12">
            <Building className="mx-auto text-gray-400" size={48} />
            <h3 className="text-lg font-semibold text-white mt-4">Company not found</h3>
          </div>
        </SecureDashboard>
      </SecureRoute>
    );
  }

  return (
    <SecureRoute>
      <SecureDashboard>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Company Settings</h1>
              <p className="text-gray-400">Manage your company information and preferences</p>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Save size={20} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <X size={20} />
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit size={20} />
                  <span>Edit Company</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-32 h-32 rounded-lg mx-auto mb-4"
                    />
                    <button className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                      <Camera size={16} className="text-white" />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold text-white">{company.name}</h2>
                  <p className="text-gray-400">{company.industry}</p>
                  <p className="text-gray-500 text-sm">{company.size}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="text-gray-400" size={16} />
                    <span className="text-gray-300">{company.website}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-gray-400" size={16} />
                    <span className="text-gray-300">{company.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-gray-400" size={16} />
                    <span className="text-gray-300">{company.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-gray-400" size={16} />
                    <span className="text-gray-300">{company.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-gray-300">Founded {formatDate(company.founded)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Company Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white">{company.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Industry</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.industry || ''}
                        onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white">{company.industry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email || ''}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white">{company.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white">{company.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editForm.website || ''}
                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white">{company.website}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Company Size</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.size || ''}
                        onChange={(e) => setEditForm({ ...editForm, size: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white">{company.size}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Address</label>
                    {isEditing ? (
                      <textarea
                        value={editForm.address || ''}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        rows={3}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white">{company.address}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Description</label>
                    {isEditing ? (
                      <textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={4}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-300">{company.description}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Subscription Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Subscription Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Current Plan</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSubscriptionColor(company.subscription.status)} text-white`}>
                      {company.subscription.plan}
                    </span>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSubscriptionColor(company.subscription.status)} text-white`}>
                      {company.subscription.status.charAt(0).toUpperCase() + company.subscription.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Start Date</label>
                    <p className="text-white">{formatDate(company.subscription.startDate)}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">End Date</label>
                    <p className="text-white">{formatDate(company.subscription.endDate)}</p>
                  </div>
                </div>
              </div>

              {/* Company Settings */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Company Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Timezone</label>
                    <select
                      value={company.settings.timezone}
                      onChange={(e) => setCompany({
                        ...company,
                        settings: { ...company.settings, timezone: e.target.value }
                      })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Asia/Jakarta">Asia/Jakarta</option>
                      <option value="Asia/Singapore">Asia/Singapore</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Language</label>
                    <select
                      value={company.settings.language}
                      onChange={(e) => setCompany({
                        ...company,
                        settings: { ...company.settings, language: e.target.value }
                      })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="id">Indonesian</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Currency</label>
                    <select
                      value={company.settings.currency}
                      onChange={(e) => setCompany({
                        ...company,
                        settings: { ...company.settings, currency: e.target.value }
                      })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="IDR">IDR (Indonesian Rupiah)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="SGD">SGD (Singapore Dollar)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Date Format</label>
                    <select
                      value={company.settings.dateFormat}
                      onChange={(e) => setCompany({
                        ...company,
                        settings: { ...company.settings, dateFormat: e.target.value }
                      })}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="text-gray-400" size={20} />
                      <div>
                        <p className="text-white font-medium">Two-Factor Authentication</p>
                        <p className="text-gray-400 text-sm">Enhanced security for company accounts</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={company.settings.twoFactorAuth}
                        onChange={(e) => setCompany({
                          ...company,
                          settings: { ...company.settings, twoFactorAuth: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="text-gray-400" size={20} />
                      <div>
                        <p className="text-white font-medium">Auto Backup</p>
                        <p className="text-gray-400 text-sm">Automatically backup company data</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={company.settings.autoBackup}
                        onChange={(e) => setCompany({
                          ...company,
                          settings: { ...company.settings, autoBackup: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Settings className="text-gray-400" size={20} />
                      <div>
                        <p className="text-white font-medium">Notifications</p>
                        <p className="text-gray-400 text-sm">Receive company-wide notifications</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={company.settings.notifications}
                        onChange={(e) => setCompany({
                          ...company,
                          settings: { ...company.settings, notifications: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
} 
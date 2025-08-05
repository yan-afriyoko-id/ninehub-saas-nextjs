'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../components/SecureRoute';
import SecureDashboard from '../components/SecureDashboard';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Settings,
  Bell,
  Globe,
  Building
} from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  position: string;
  department: string;
  company: string;
  address: string;
  bio: string;
  dateOfBirth: string;
  joinDate: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    darkMode: boolean;
    language: string;
    timezone: string;
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Profile>>({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyProfile: Profile = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@ninehub.com',
        phone: '+6281234567890',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D9488&color=fff',
        position: 'Senior Developer',
        department: 'Engineering',
        company: 'NineHub',
        address: 'Jl. Business No. 1, Jakarta, Indonesia',
        bio: 'Experienced software developer with expertise in full-stack development, cloud architecture, and team leadership.',
        dateOfBirth: '1990-05-15',
        joinDate: '2022-03-01',
        lastLogin: '2024-01-20T10:30:00Z',
        status: 'active',
        preferences: {
          notifications: true,
          emailUpdates: true,
          darkMode: true,
          language: 'en',
          timezone: 'Asia/Jakarta'
        }
      };
      setProfile(dummyProfile);
      setEditForm(dummyProfile);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    if (profile) {
      setProfile({ ...profile, ...editForm });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditForm(profile);
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (!profile) {
    return (
      <SecureRoute>
        <SecureDashboard>
          <div className="text-center py-12">
            <User className="mx-auto text-gray-400" size={48} />
            <h3 className="text-lg font-semibold text-white mt-4">Profile not found</h3>
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
              <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
              <p className="text-gray-400">Manage your personal information and preferences</p>
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
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <button className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                      <Camera size={16} className="text-white" />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold text-white">{profile.name}</h2>
                  <p className="text-gray-400">{profile.position}</p>
                  <p className="text-gray-500 text-sm">{profile.department}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building className="text-gray-400" size={16} />
                    <span className="text-gray-300">{profile.company}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-gray-400" size={16} />
                    <span className="text-gray-300">{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-gray-400" size={16} />
                    <span className="text-gray-300">{profile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-gray-400" size={16} />
                    <span className="text-gray-300">{profile.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-gray-300">Joined {formatDate(profile.joinDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white">{profile.name}</p>
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
                      <p className="text-white">{profile.email}</p>
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
                      <p className="text-white">{profile.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Position</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.position || ''}
                        onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-white">{profile.position}</p>
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
                      <p className="text-white">{profile.address}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={editForm.bio || ''}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={4}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-300">{profile.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Date of Birth</label>
                    <p className="text-white">{formatDate(profile.dateOfBirth)}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Join Date</label>
                    <p className="text-white">{formatDate(profile.joinDate)}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Last Login</label>
                    <p className="text-white">{formatDateTime(profile.lastLogin)}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Status</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      profile.status === 'active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="text-gray-400" size={20} />
                      <div>
                        <p className="text-white font-medium">Push Notifications</p>
                        <p className="text-gray-400 text-sm">Receive notifications for important updates</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.preferences.notifications}
                        onChange={(e) => setProfile({
                          ...profile,
                          preferences: { ...profile.preferences, notifications: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="text-gray-400" size={20} />
                      <div>
                        <p className="text-white font-medium">Email Updates</p>
                        <p className="text-gray-400 text-sm">Receive email notifications</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.preferences.emailUpdates}
                        onChange={(e) => setProfile({
                          ...profile,
                          preferences: { ...profile.preferences, emailUpdates: e.target.checked }
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
                        <p className="text-white font-medium">Dark Mode</p>
                        <p className="text-gray-400 text-sm">Use dark theme</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.preferences.darkMode}
                        onChange={(e) => setProfile({
                          ...profile,
                          preferences: { ...profile.preferences, darkMode: e.target.checked }
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
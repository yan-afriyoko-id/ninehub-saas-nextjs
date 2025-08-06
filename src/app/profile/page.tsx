'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../components/SecureRoute';
import SecureDashboard from '../components/SecureDashboard';
import { apiClient } from '../services/api';
import { useAuth } from '../components/AuthContext';
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
  age?: string;
  gender?: string;
  phone_number?: string;
  address?: string;
  birth_date?: string;
  avatar?: string;
  position?: string;
  department?: string;
  company?: string;
  bio?: string;
  joinDate?: string;
  lastLogin?: string;
  status: 'active' | 'inactive';
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    darkMode: boolean;
    language: string;
    timezone: string;
  };
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Profile>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try to get profile from API using token (current user's profile)
        const response = await apiClient.getMyProfile();
        
        if (response.success && response.data) {
          // Transform API data to Profile format - only use real data
          const profileData: Profile = {
            id: response.data.id || user.id,
            name: response.data.name || user.name,
            email: response.data.email || user.email,
            age: response.data.age || undefined,
            gender: response.data.gender || undefined,
            phone_number: response.data.phone_number || undefined,
            address: response.data.address || undefined,
            birth_date: response.data.birth_date || undefined,
            avatar: response.data.avatar || user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(response.data.name || user.name)}&background=0D9488&color=fff`,
            position: response.data.position || undefined,
            department: response.data.department || undefined,
            company: response.data.company || undefined,
            bio: response.data.bio || undefined,
            joinDate: response.data.joinDate || undefined,
            lastLogin: response.data.lastLogin || undefined,
            status: 'active',
            preferences: {
              notifications: true,
              emailUpdates: true,
              darkMode: true,
              language: 'en',
              timezone: 'Asia/Jakarta'
            }
          };
          
          setProfile(profileData);
          setEditForm(profileData);
        } else {
          throw new Error(response.message || 'Failed to load profile');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setError('Failed to load profile data');
        
        // Fallback to user data from AuthContext - minimal data only
        if (user) {
          const fallbackProfile: Profile = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D9488&color=fff`,
            status: 'active',
            preferences: {
              notifications: true,
              emailUpdates: true,
              darkMode: true,
              language: 'en',
              timezone: 'Asia/Jakarta'
            }
          };
          
          setProfile(fallbackProfile);
          setEditForm(fallbackProfile);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (profile) {
      try {
        setIsLoading(true);
        
        // Prepare data for API update - only send fields that have values
        const updateData: any = {};
        if (editForm.name) updateData.name = editForm.name;
        if (editForm.age) updateData.age = editForm.age;
        if (editForm.gender) updateData.gender = editForm.gender;
        if (editForm.phone_number) updateData.phone_number = editForm.phone_number;
        if (editForm.address) updateData.address = editForm.address;
        if (editForm.birth_date) updateData.birth_date = editForm.birth_date;
        if (editForm.bio) updateData.bio = editForm.bio;
        
        // Update profile via API using PUT method with token
        const response = await apiClient.updateMyProfile(updateData);
        
        if (response.success && response.data) {
          setProfile({ ...profile, ...editForm });
          setIsEditing(false);
          setError(null);
        } else {
          throw new Error(response.message || 'Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setError('Failed to update profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
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
              {error && (
                <div className="mt-2 p-3 bg-red-600 text-white rounded-lg">
                  {error}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Edit size={20} />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                  <p className="text-gray-400">{profile.position || 'User'}</p>
                  {profile.company && (
                    <p className="text-gray-400 text-sm">{profile.company}</p>
                  )}
                </div>

                <div className="space-y-4">
                  {profile.company && (
                    <div className="flex items-center space-x-3">
                      <Building className="text-gray-400" size={16} />
                      <span className="text-gray-300">{profile.company}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Mail className="text-gray-400" size={16} />
                    <span className="text-gray-300">{profile.email}</span>
                  </div>
                  {profile.age && (
                    <div className="flex items-center space-x-3">
                      <User className="text-gray-400" size={16} />
                      <span className="text-gray-300">{profile.age} years old</span>
                    </div>
                  )}
                  {profile.gender && (
                    <div className="flex items-center space-x-3">
                      <User className="text-gray-400" size={16} />
                      <span className="text-gray-300">{profile.gender}</span>
                    </div>
                  )}
                  {profile.phone_number && (
                    <div className="flex items-center space-x-3">
                      <Phone className="text-gray-400" size={16} />
                      <span className="text-gray-300">{profile.phone_number}</span>
                    </div>
                  )}
                  {profile.address && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-gray-400" size={16} />
                      <span className="text-gray-300">{profile.address}</span>
                    </div>
                  )}
                  {profile.joinDate && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="text-gray-400" size={16} />
                      <span className="text-gray-300">Joined {formatDate(profile.joinDate)}</span>
                    </div>
                  )}
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
                    <p className="text-white">{profile.name}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <p className="text-white">{profile.email}</p>
                  </div>
                  {profile.age && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Age</label>
                      <p className="text-white">{profile.age}</p>
                    </div>
                  )}
                  {profile.gender && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Gender</label>
                      <p className="text-white">{profile.gender}</p>
                    </div>
                  )}
                  {profile.phone_number && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                      <p className="text-white">{profile.phone_number}</p>
                    </div>
                  )}
                  {profile.position && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Position</label>
                      <p className="text-white">{profile.position}</p>
                    </div>
                  )}
                  {profile.birth_date && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Birth Date</label>
                      <p className="text-white">{formatDate(profile.birth_date)}</p>
                    </div>
                  )}
                  {profile.address && (
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">Address</label>
                      <p className="text-white">{profile.address}</p>
                    </div>
                  )}
                  {profile.bio && (
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">Bio</label>
                      <p className="text-gray-300">{profile.bio}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">User ID</label>
                    <p className="text-white">{profile.id}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Status</label>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {profile.status}
                    </span>
                  </div>
                  {profile.joinDate && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Join Date</label>
                      <p className="text-white">{formatDate(profile.joinDate)}</p>
                    </div>
                  )}
                  {profile.lastLogin && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Last Login</label>
                      <p className="text-white">{formatDateTime(profile.lastLogin)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Edit Form */}
              {isEditing && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Edit Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Age</label>
                      <input
                        type="number"
                        value={editForm.age || ''}
                        onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Gender</label>
                      <select
                        value={editForm.gender || ''}
                        onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={editForm.phone_number || ''}
                        onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Birth Date</label>
                      <input
                        type="date"
                        value={editForm.birth_date || ''}
                        onChange={(e) => setEditForm({ ...editForm, birth_date: e.target.value })}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">Address</label>
                      <textarea
                        value={editForm.address || ''}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        rows={3}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">Bio</label>
                      <textarea
                        value={editForm.bio || ''}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={4}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 mt-6">
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
} 
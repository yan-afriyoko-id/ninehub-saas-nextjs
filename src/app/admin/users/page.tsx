'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../../components/SecureRoute';
import SecureDashboard from '../../components/SecureDashboard';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  MoreVertical,
  Users,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Calendar,
  Mail,
  Phone,
  Building
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  tenant: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyUsers: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@acme.com',
          phone: '+6281234567890',
          role: 'admin',
          tenant: 'Acme Corporation',
          status: 'active',
          lastLogin: '2024-01-20T10:30:00Z',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D9488&color=fff'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@techstart.com',
          phone: '+6281234567891',
          role: 'tenant',
          tenant: 'TechStart Inc',
          status: 'active',
          lastLogin: '2024-01-19T15:20:00Z',
          createdAt: '2024-01-10T09:00:00Z',
          updatedAt: '2024-01-18T16:45:00Z',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=3B82F6&color=fff'
        },
        {
          id: '3',
          name: 'Bob Johnson',
          email: 'bob.johnson@global.com',
          phone: '+6281234567892',
          role: 'user',
          tenant: 'Global Solutions',
          status: 'active',
          lastLogin: '2024-01-20T08:15:00Z',
          createdAt: '2024-01-12T11:30:00Z',
          updatedAt: '2024-01-19T13:20:00Z',
          avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=8B5CF6&color=fff'
        },
        {
          id: '4',
          name: 'Alice Brown',
          email: 'alice.brown@small.com',
          phone: '+6281234567893',
          role: 'user',
          tenant: 'Small Business',
          status: 'inactive',
          lastLogin: '2024-01-15T12:00:00Z',
          createdAt: '2024-01-05T14:20:00Z',
          updatedAt: '2024-01-16T09:15:00Z',
          avatar: 'https://ui-avatars.com/api/?name=Alice+Brown&background=F59E0B&color=fff'
        },
        {
          id: '5',
          name: 'Charlie Wilson',
          email: 'charlie.wilson@suspended.com',
          phone: '+6281234567894',
          role: 'tenant',
          tenant: 'Suspended Corp',
          status: 'suspended',
          lastLogin: '2024-01-10T16:45:00Z',
          createdAt: '2024-01-08T08:15:00Z',
          updatedAt: '2024-01-17T10:30:00Z',
          avatar: 'https://ui-avatars.com/api/?name=Charlie+Wilson&background=EF4444&color=fff'
        },
        {
          id: '6',
          name: 'Diana Davis',
          email: 'diana.davis@acme.com',
          phone: '+6281234567895',
          role: 'user',
          tenant: 'Acme Corporation',
          status: 'active',
          lastLogin: '2024-01-20T09:30:00Z',
          createdAt: '2024-01-16T11:00:00Z',
          updatedAt: '2024-01-20T12:30:00Z',
          avatar: 'https://ui-avatars.com/api/?name=Diana+Davis&background=10B981&color=fff'
        }
      ];
      setUsers(dummyUsers);
      setFilteredUsers(dummyUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.tenant.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    // Filter by role
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterStatus, filterRole]);

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'inactive':
        return <XCircle className="text-red-500" size={16} />;
      case 'suspended':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      default:
        return <XCircle className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'inactive':
        return 'text-red-500';
      case 'suspended':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getRoleColor = (role: string) => {
    const colorMap: { [key: string]: string } = {
      'admin': 'bg-red-600',
      'tenant': 'bg-blue-600',
      'user': 'bg-green-600',
      'guest': 'bg-gray-600'
    };
    return colorMap[role] || 'bg-gray-600';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield size={16} />;
      case 'tenant':
        return <Building size={16} />;
      case 'user':
        return <User size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const uniqueRoles = Array.from(new Set(users.map(u => u.role)));

  if (isLoading) {
    return (
      <SecureRoute adminOnly={true}>
        <SecureDashboard>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </SecureDashboard>
      </SecureRoute>
    );
  }

  return (
    <SecureRoute adminOnly={true}>
      <SecureDashboard>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">User Management</h1>
              <p className="text-gray-400">Manage system users and their permissions</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Add User</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              {uniqueRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div key={user.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6B7280&color=fff`}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(user.status)}
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Role:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)} text-white`}>
                      {getRoleIcon(user.role)}
                      <span className="ml-1">{user.role}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Tenant:</span>
                    <span className="text-white font-medium">{user.tenant}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white font-medium">{user.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Status:</span>
                    <span className={getStatusColor(user.status)}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Activity Info */}
                <div className="mb-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-xs mb-2">Activity:</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Created:</span>
                      <span className="text-gray-300">{formatDate(user.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Last Login:</span>
                      <span className="text-gray-300">{formatDate(user.lastLogin)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded text-sm transition-colors ${
                      user.status === 'active'
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {user.status === 'active' ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span>{user.status === 'active' ? 'Disable' : 'Enable'}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-white mt-4">No users found</h3>
              <p className="text-gray-400 mt-2">
                {searchTerm || filterStatus !== 'all' || filterRole !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first user.'
                }
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
                <Users className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Admins</p>
                  <p className="text-2xl font-bold text-white">{users.filter(u => u.role === 'admin').length}</p>
                </div>
                <Shield className="text-red-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Tenants</p>
                  <p className="text-2xl font-bold text-white">{users.filter(u => u.role === 'tenant').length}</p>
                </div>
                <Building className="text-purple-500" size={24} />
              </div>
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
} 
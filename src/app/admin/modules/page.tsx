'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../../components/SecureRoute';
import SecureDashboard from '../../components/SecureDashboard';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Search,
  Filter,
  MoreVertical,
  Database,
  Key,
  Shield,
  CreditCard,
  Settings,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

interface Module {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  route: string;
  order: number;
  isActive: boolean;
  isPublic: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyModules: Module[] = [
        {
          id: '1',
          name: 'User Management',
          slug: 'user-management',
          description: 'Manage users, roles, and permissions',
          icon: 'users',
          route: 'user-management.index',
          order: 1,
          isActive: true,
          isPublic: false,
          permissions: ['user.view', 'user.create', 'user.edit', 'user.delete'],
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z'
        },
        {
          id: '2',
          name: 'Tenant Management',
          slug: 'tenant-management',
          description: 'Manage multi-tenant organizations',
          icon: 'building',
          route: 'tenant-management.index',
          order: 2,
          isActive: true,
          isPublic: false,
          permissions: ['tenant.view', 'tenant.create', 'tenant.edit', 'tenant.delete'],
          createdAt: '2024-01-10T09:00:00Z',
          updatedAt: '2024-01-18T16:45:00Z'
        },
        {
          id: '3',
          name: 'Plan Management',
          slug: 'plan-management',
          description: 'Manage subscription plans and pricing',
          icon: 'credit-card',
          route: 'plan-management.index',
          order: 3,
          isActive: true,
          isPublic: false,
          permissions: ['plan.view', 'plan.create', 'plan.edit', 'plan.delete'],
          createdAt: '2024-01-12T11:30:00Z',
          updatedAt: '2024-01-19T13:20:00Z'
        },
        {
          id: '4',
          name: 'CRM System',
          slug: 'crm',
          description: 'Customer relationship management',
          icon: 'briefcase',
          route: 'crm.index',
          order: 4,
          isActive: true,
          isPublic: true,
          permissions: ['crm.view', 'crm.create', 'crm.edit'],
          createdAt: '2024-01-08T08:15:00Z',
          updatedAt: '2024-01-17T10:30:00Z'
        },
        {
          id: '5',
          name: 'AI Chat',
          slug: 'ai-chat',
          description: 'Artificial intelligence chat system',
          icon: 'message-circle',
          route: 'ai-chat.index',
          order: 5,
          isActive: true,
          isPublic: true,
          permissions: ['chat.send', 'chat.history'],
          createdAt: '2024-01-05T14:20:00Z',
          updatedAt: '2024-01-16T09:15:00Z'
        }
      ];
      setModules(dummyModules);
      setFilteredModules(dummyModules);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = modules;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(module =>
        module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(module =>
        filterStatus === 'active' ? module.isActive : !module.isActive
      );
    }

    setFilteredModules(filtered);
  }, [modules, searchTerm, filterStatus]);

  const handleToggleStatus = (moduleId: string) => {
    setModules(prev => prev.map(module =>
      module.id === moduleId
        ? { ...module, isActive: !module.isActive }
        : module
    ));
  };

  const handleDeleteModule = (moduleId: string) => {
    if (confirm('Are you sure you want to delete this module?')) {
      setModules(prev => prev.filter(module => module.id !== moduleId));
    }
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? (
      <CheckCircle className="text-green-500" size={16} />
    ) : (
      <XCircle className="text-red-500" size={16} />
    );
  };

  const getModuleIcon = (icon: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
      'users': () => <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">U</div>,
      'building': () => <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs">B</div>,
      'credit-card': () => <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs">P</div>,
      'briefcase': () => <div className="w-6 h-6 bg-yellow-600 rounded flex items-center justify-center text-white text-xs">C</div>,
      'message-circle': () => <div className="w-6 h-6 bg-pink-600 rounded flex items-center justify-center text-white text-xs">A</div>,
    };
    
    const IconComponent = iconMap[icon] || (() => <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-white text-xs">M</div>);
    return <IconComponent />;
  };

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
              <h1 className="text-3xl font-bold text-white">Module Management</h1>
              <p className="text-gray-400">Manage system modules and their configurations</p>
        </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Add Module</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <div key={module.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getModuleIcon(module.icon)}
                    <div>
                      <h3 className="text-lg font-semibold text-white">{module.name}</h3>
                      <p className="text-gray-400 text-sm">{module.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(module.isActive)}
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <MoreVertical size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

                <p className="text-gray-300 text-sm mb-4">{module.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Route:</span>
                    <span className="text-white font-mono">{module.route}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Order:</span>
                    <span className="text-white">{module.order}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Public:</span>
                    <span className={`${module.isPublic ? 'text-green-500' : 'text-red-500'}`}>
                      {module.isPublic ? 'Yes' : 'No'}
                    </span>
            </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Permissions:</span>
                    <span className="text-white">{module.permissions.length}</span>
            </div>
                        </div>

                <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => setEditingModule(module)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                          <button
                    onClick={() => handleToggleStatus(module.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded text-sm transition-colors ${
                      module.isActive
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {module.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span>{module.isActive ? 'Disable' : 'Enable'}</span>
                          </button>
                          <button
                    onClick={() => handleDeleteModule(module.id)}
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
          {filteredModules.length === 0 && (
            <div className="text-center py-12">
              <Database className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-white mt-4">No modules found</h3>
              <p className="text-gray-400 mt-2">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first module.'
                }
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Modules</p>
                  <p className="text-2xl font-bold text-white">{modules.length}</p>
                </div>
                <Database className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Modules</p>
                  <p className="text-2xl font-bold text-white">{modules.filter(m => m.isActive).length}</p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Public Modules</p>
                  <p className="text-2xl font-bold text-white">{modules.filter(m => m.isPublic).length}</p>
                </div>
                <Eye className="text-purple-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Permissions</p>
                  <p className="text-2xl font-bold text-white">
                    {modules.reduce((total, module) => total + module.permissions.length, 0)}
                  </p>
                </div>
                <Key className="text-yellow-500" size={24} />
              </div>
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
} 
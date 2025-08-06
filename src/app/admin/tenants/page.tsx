'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../../components/SecureRoute';
import SecureDashboard from '../../components/SecureDashboard';
import { apiClient, Tenant } from '../../services/api';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setIsLoading(true);
      setError(null);
              const response = await apiClient.getTenants();
      
      if (response.success && response.data) {
        setTenants(response.data);
      } else {
        // Fallback to dummy data if API fails
        const dummyTenants: Tenant[] = [
          {
            id: '1',
            name: 'TechCorp Solutions',
            email: 'info@techcorp.com',
            phone: '+6281234567890',
            address: 'Jl. Business No. 1, Jakarta',
            status: 'active',
            plan_id: '1',
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-20T15:45:00Z'
          },
          {
            id: '2',
            name: 'Digital Innovations Ltd',
            email: 'contact@digitalinnovations.com',
            phone: '+6281234567891',
            address: 'Jl. Innovation No. 2, Bandung',
            status: 'active',
            plan_id: '2',
            created_at: '2024-01-10T09:15:00Z',
            updated_at: '2024-01-19T14:20:00Z'
          },
          {
            id: '3',
            name: 'StartupHub Indonesia',
            email: 'hello@startuphub.id',
            phone: '+6281234567892',
            address: 'Jl. Startup No. 3, Surabaya',
            status: 'inactive',
            plan_id: '1',
            created_at: '2024-01-05T08:00:00Z',
            updated_at: '2024-01-18T11:30:00Z'
          }
        ];
        setTenants(dummyTenants);
      }
    } catch (error) {
      console.error('Error fetching tenants:', error);
      setError('Failed to load tenants. Please try again.');
      // Fallback to dummy data
      const dummyTenants: Tenant[] = [
        {
          id: '1',
          name: 'TechCorp Solutions',
          email: 'info@techcorp.com',
          phone: '+6281234567890',
          address: 'Jl. Business No. 1, Jakarta',
          status: 'active',
          plan_id: '1',
          created_at: '2024-01-15T10:30:00Z',
          updated_at: '2024-01-20T15:45:00Z'
        },
        {
          id: '2',
          name: 'Digital Innovations Ltd',
          email: 'contact@digitalinnovations.com',
          phone: '+6281234567891',
          address: 'Jl. Innovation No. 2, Bandung',
          status: 'active',
          plan_id: '2',
          created_at: '2024-01-10T09:15:00Z',
          updated_at: '2024-01-19T14:20:00Z'
        },
        {
          id: '3',
          name: 'StartupHub Indonesia',
          email: 'hello@startuphub.id',
          phone: '+6281234567892',
          address: 'Jl. Startup No. 3, Surabaya',
          status: 'inactive',
          plan_id: '1',
          created_at: '2024-01-05T08:00:00Z',
          updated_at: '2024-01-18T11:30:00Z'
        }
      ];
      setTenants(dummyTenants);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTenant = async (id: string) => {
    if (confirm('Are you sure you want to delete this tenant?')) {
      try {
        const response = await apiClient.deleteTenant(id);
        if (response.success) {
          setTenants(prev => prev.filter(tenant => tenant.id !== id));
        } else {
          alert('Failed to delete tenant. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting tenant:', error);
        alert('Failed to delete tenant. Please try again.');
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
              const response = await apiClient.updateTenant(id, { status: newStatus });
      
      if (response.success && response.data) {
        setTenants(prev => prev.map(tenant => 
          tenant.id === id ? { ...tenant, status: newStatus as 'active' | 'inactive' } : tenant
        ));
      } else {
        alert('Failed to update tenant status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating tenant status:', error);
      alert('Failed to update tenant status. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-500' : 'text-red-500';
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? 
      <CheckCircle className="text-green-500" size={16} /> : 
      <XCircle className="text-red-500" size={16} />;
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              <h1 className="text-3xl font-bold text-white">Tenant Management</h1>
              <p className="text-gray-400">Manage multi-tenant organizations</p>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus size={20} />
              <span>Add Tenant</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Tenants</p>
                  <p className="text-2xl font-bold text-white">{tenants.length}</p>
                </div>
                <Building className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Tenants</p>
                  <p className="text-2xl font-bold text-white">{tenants.filter(t => t.status === 'active').length}</p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Inactive Tenants</p>
                  <p className="text-2xl font-bold text-white">{tenants.filter(t => t.status === 'inactive').length}</p>
                </div>
                <XCircle className="text-red-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-white">{tenants.filter(t => {
                    const created = new Date(t.created_at);
                    const now = new Date();
                    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                  }).length}</p>
                </div>
                <Calendar className="text-purple-500" size={24} />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search tenants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="text-gray-400" size={20} />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900 border border-red-700 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-red-400" size={20} />
                <span className="text-red-400">{error}</span>
              </div>
            </div>
          )}

          {/* Tenants Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredTenants.map((tenant) => (
                    <tr key={tenant.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{tenant.name}</div>
                          <div className="text-sm text-gray-400">{tenant.address}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-white">{tenant.email}</div>
                          <div className="text-sm text-gray-400">{tenant.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(tenant.status)}
                          <span className={`text-sm font-medium ${getStatusColor(tenant.status)}`}>
                            {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(tenant.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleStatus(tenant.id, tenant.status)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              tenant.status === 'active'
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                          >
                            {tenant.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button className="p-2 hover:bg-gray-600 rounded transition-colors">
                            <Edit size={16} className="text-blue-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteTenant(tenant.id)}
                            className="p-2 hover:bg-gray-600 rounded transition-colors"
                          >
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredTenants.length === 0 && (
            <div className="text-center py-12">
              <Building className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-white mt-4">No tenants found</h3>
              <p className="text-gray-400 mt-2">No tenants match your current filters.</p>
            </div>
          )}
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
} 
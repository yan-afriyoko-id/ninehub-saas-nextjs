'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../../components/SecureRoute';
import SecureDashboard from '../../components/SecureDashboard';
import { 
  Database, 
  Download, 
  Upload, 
  Play,
  Pause,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  HardDrive,
  FileText,
  Settings,
  RefreshCw
} from 'lucide-react';

interface Backup {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'database' | 'files';
  size: string;
  status: 'completed' | 'in_progress' | 'failed' | 'scheduled';
  created_at: string;
  completed_at?: string;
  retention_days: number;
  location: 'local' | 'cloud';
}

export default function BackupRestorePage() {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyBackups: Backup[] = [
        {
          id: '1',
          name: 'Full Backup - 2024-01-20',
          type: 'full',
          size: '2.5 GB',
          status: 'completed',
          created_at: '2024-01-20T10:00:00Z',
          completed_at: '2024-01-20T10:15:00Z',
          retention_days: 30,
          location: 'local'
        },
        {
          id: '2',
          name: 'Database Backup - 2024-01-19',
          type: 'database',
          size: '1.2 GB',
          status: 'completed',
          created_at: '2024-01-19T22:00:00Z',
          completed_at: '2024-01-19T22:05:00Z',
          retention_days: 7,
          location: 'cloud'
        },
        {
          id: '3',
          name: 'Incremental Backup - 2024-01-18',
          type: 'incremental',
          size: '500 MB',
          status: 'completed',
          created_at: '2024-01-18T22:00:00Z',
          completed_at: '2024-01-18T22:02:00Z',
          retention_days: 7,
          location: 'local'
        },
        {
          id: '4',
          name: 'Files Backup - 2024-01-17',
          type: 'files',
          size: '800 MB',
          status: 'completed',
          created_at: '2024-01-17T22:00:00Z',
          completed_at: '2024-01-17T22:10:00Z',
          retention_days: 30,
          location: 'cloud'
        },
        {
          id: '5',
          name: 'Full Backup - 2024-01-16',
          type: 'full',
          size: '2.3 GB',
          status: 'failed',
          created_at: '2024-01-16T22:00:00Z',
          retention_days: 30,
          location: 'local'
        }
      ];
      setBackups(dummyBackups);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    setTimeout(() => {
      const newBackup: Backup = {
        id: Date.now().toString(),
        name: `Manual Backup - ${new Date().toLocaleDateString()}`,
        type: 'full',
        size: '0 MB',
        status: 'in_progress',
        created_at: new Date().toISOString(),
        retention_days: 30,
        location: 'local'
      };
      setBackups(prev => [newBackup, ...prev]);
      setIsCreatingBackup(false);
    }, 2000);
  };

  const handleRestore = async (backupId: string) => {
    if (confirm('Are you sure you want to restore this backup? This will overwrite current data.')) {
      setIsRestoring(true);
      // Simulate restore process
      setTimeout(() => {
        alert('Restore completed successfully!');
        setIsRestoring(false);
      }, 3000);
    }
  };

  const handleDeleteBackup = async (backupId: string) => {
    if (confirm('Are you sure you want to delete this backup?')) {
      setBackups(prev => prev.filter(backup => backup.id !== backupId));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'in_progress':
        return <RefreshCw className="text-blue-500 animate-spin" size={16} />;
      case 'failed':
        return <XCircle className="text-red-500" size={16} />;
      case 'scheduled':
        return <Clock className="text-yellow-500" size={16} />;
      default:
        return <AlertTriangle className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'in_progress':
        return 'text-blue-500';
      case 'failed':
        return 'text-red-500';
      case 'scheduled':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full':
        return 'bg-blue-600';
      case 'incremental':
        return 'bg-green-600';
      case 'database':
        return 'bg-purple-600';
      case 'files':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
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
              <h1 className="text-3xl font-bold text-white">Backup & Restore</h1>
              <p className="text-gray-400">Manage system backups and restoration</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCreateBackup}
                disabled={isCreatingBackup}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
              >
                {isCreatingBackup ? (
                  <RefreshCw className="animate-spin" size={20} />
                ) : (
                  <Database size={20} />
                )}
                <span>{isCreatingBackup ? 'Creating...' : 'Create Backup'}</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Backups</p>
                  <p className="text-2xl font-bold text-white">{backups.length}</p>
                </div>
                <Database className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{backups.filter(b => b.status === 'completed').length}</p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Failed</p>
                  <p className="text-2xl font-bold text-white">{backups.filter(b => b.status === 'failed').length}</p>
                </div>
                <XCircle className="text-red-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Size</p>
                  <p className="text-2xl font-bold text-white">7.3 GB</p>
                </div>
                <HardDrive className="text-purple-500" size={24} />
              </div>
            </div>
          </div>

          {/* Backup Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="text-blue-500" size={24} />
              <h3 className="text-lg font-semibold text-white">Backup Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Auto Backup</label>
                <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Backup Time</label>
                <input
                  type="time"
                  defaultValue="22:00"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Retention Period</label>
                <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Storage Location</label>
                <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="local">Local Storage</option>
                  <option value="cloud">Cloud Storage</option>
                  <option value="both">Both</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Compression</label>
                <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Encryption</label>
                <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Backups List */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Backup History</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Backup
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Size
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
                  {backups.map((backup) => (
                    <tr key={backup.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{backup.name}</div>
                          <div className="text-sm text-gray-400">{backup.location}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(backup.type)} text-white`}>
                          {backup.type.charAt(0).toUpperCase() + backup.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {backup.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(backup.status)}
                          <span className={`text-sm font-medium ${getStatusColor(backup.status)}`}>
                            {backup.status.replace('_', ' ').charAt(0).toUpperCase() + backup.status.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDateTime(backup.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {backup.status === 'completed' && (
                            <>
                              <button
                                onClick={() => handleRestore(backup.id)}
                                disabled={isRestoring}
                                className="p-2 hover:bg-gray-600 rounded transition-colors"
                                title="Restore"
                              >
                                <Play size={16} className="text-green-400" />
                              </button>
                              <button
                                className="p-2 hover:bg-gray-600 rounded transition-colors"
                                title="Download"
                              >
                                <Download size={16} className="text-blue-400" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteBackup(backup.id)}
                            className="p-2 hover:bg-gray-600 rounded transition-colors"
                            title="Delete"
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

          {backups.length === 0 && (
            <div className="text-center py-12">
              <Database className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-white mt-4">No backups found</h3>
              <p className="text-gray-400 mt-2">Create your first backup to get started.</p>
            </div>
          )}
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
} 
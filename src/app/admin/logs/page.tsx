'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../../components/SecureRoute';
import SecureDashboard from '../../components/SecureDashboard';
import { 
  FileText, 
  Search, 
  Filter,
  Download,
  Eye,
  AlertTriangle,
  XCircle,
  Info,
  Clock,
  User,
  Activity
} from 'lucide-react';

interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  user_id?: string;
  user_name?: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
  context?: Record<string, unknown>;
}

export default function SystemLogsPage() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyLogs: SystemLog[] = [
        {
          id: '1',
          level: 'info',
          message: 'User login successful',
          user_id: '1',
          user_name: 'Admin User',
          ip_address: '192.168.1.100',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          created_at: '2024-01-20T10:30:00Z'
        },
        {
          id: '2',
          level: 'warning',
          message: 'Failed login attempt',
          user_id: '2',
          user_name: 'Unknown User',
          ip_address: '192.168.1.101',
          user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
          created_at: '2024-01-20T10:25:00Z'
        },
        {
          id: '3',
          level: 'error',
          message: 'Database connection failed',
          ip_address: '192.168.1.102',
          user_agent: 'System/1.0',
          created_at: '2024-01-20T10:20:00Z'
        },
        {
          id: '4',
          level: 'info',
          message: 'Tenant created successfully',
          user_id: '1',
          user_name: 'Admin User',
          ip_address: '192.168.1.100',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          created_at: '2024-01-20T10:15:00Z'
        },
        {
          id: '5',
          level: 'debug',
          message: 'API request processed',
          user_id: '3',
          user_name: 'Test User',
          ip_address: '192.168.1.103',
          user_agent: 'PostmanRuntime/7.32.3',
          created_at: '2024-01-20T10:10:00Z'
        }
      ];
      setLogs(dummyLogs);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <Info className="text-blue-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'error':
        return <XCircle className="text-red-500" size={16} />;
      case 'debug':
        return <Activity className="text-gray-500" size={16} />;
      default:
        return <Info className="text-gray-500" size={16} />;
    }
  };



  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.user_name && log.user_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
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
              <h1 className="text-3xl font-bold text-white">System Logs</h1>
              <p className="text-gray-400">Monitor system activities and events</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Download size={20} />
                <span>Export Logs</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Logs</p>
                  <p className="text-2xl font-bold text-white">{logs.length}</p>
                </div>
                <FileText className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Info</p>
                  <p className="text-2xl font-bold text-white">{logs.filter(l => l.level === 'info').length}</p>
                </div>
                <Info className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Warnings</p>
                  <p className="text-2xl font-bold text-white">{logs.filter(l => l.level === 'warning').length}</p>
                </div>
                <AlertTriangle className="text-yellow-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Errors</p>
                  <p className="text-2xl font-bold text-white">{logs.filter(l => l.level === 'error').length}</p>
                </div>
                <XCircle className="text-red-500" size={24} />
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
                    placeholder="Search logs..."
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
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="debug">Debug</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-400" size={20} />
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getLevelIcon(log.level)}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            log.level === 'info' ? 'bg-blue-600' :
                            log.level === 'warning' ? 'bg-yellow-600' :
                            log.level === 'error' ? 'bg-red-600' :
                            'bg-gray-600'
                          } text-white`}>
                            {log.level.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="text-sm text-white">{log.message}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <User className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-300">
                            {log.user_name || 'System'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {log.ip_address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDateTime(log.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="p-2 hover:bg-gray-600 rounded transition-colors">
                          <Eye size={16} className="text-blue-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-white mt-4">No logs found</h3>
              <p className="text-gray-400 mt-2">No logs match your current filters.</p>
            </div>
          )}
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
} 
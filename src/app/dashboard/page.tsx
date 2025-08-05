'use client';

import { useState, useEffect } from 'react';
import SecureRoute from '../components/SecureRoute';
import SecureDashboard from '../components/SecureDashboard';
import { 
  Users, 
  Building, 
  MessageCircle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Target,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  BarChart3,
  PieChart,
  Clock,
  Calendar,
  FileText,
  Settings
} from 'lucide-react';

interface UserDashboardStats {
  totalContacts: number;
  totalLeads: number;
  totalCompanies: number;
  activeChats: number;
  recentActivities: Array<{
    id: string;
    type: 'contact' | 'lead' | 'company' | 'chat';
    message: string;
    timestamp: string;
    status: 'success' | 'warning' | 'error';
  }>;
  upcomingTasks: Array<{
    id: string;
    title: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    type: 'follow-up' | 'meeting' | 'deadline';
  }>;
}

export default function UserDashboard() {
  const [stats, setStats] = useState<UserDashboardStats>({
    totalContacts: 0,
    totalLeads: 0,
    totalCompanies: 0,
    activeChats: 0,
    recentActivities: [],
    upcomingTasks: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalContacts: 156,
        totalLeads: 23,
        totalCompanies: 12,
        activeChats: 5,
        recentActivities: [
          {
            id: '1',
            type: 'contact',
            message: 'New contact added: John Doe from TechCorp',
            timestamp: '2 minutes ago',
            status: 'success'
          },
          {
            id: '2',
            type: 'lead',
            message: 'Lead "Acme Project" status updated to Qualified',
            timestamp: '15 minutes ago',
            status: 'success'
          },
          {
            id: '3',
            type: 'company',
            message: 'Company profile updated: ABC Corporation',
            timestamp: '1 hour ago',
            status: 'success'
          },
          {
            id: '4',
            type: 'chat',
            message: 'AI Chat session started with customer support',
            timestamp: '2 hours ago',
            status: 'success'
          },
          {
            id: '5',
            type: 'lead',
            message: 'Follow-up reminder: Contact Sarah Johnson',
            timestamp: '3 hours ago',
            status: 'warning'
          }
        ],
        upcomingTasks: [
          {
            id: '1',
            title: 'Follow up with TechCorp proposal',
            dueDate: 'Today',
            priority: 'high',
            type: 'follow-up'
          },
          {
            id: '2',
            title: 'Meeting with ABC Corp team',
            dueDate: 'Tomorrow',
            priority: 'medium',
            type: 'meeting'
          },
          {
            id: '3',
            title: 'Submit monthly report',
            dueDate: 'Dec 15',
            priority: 'high',
            type: 'deadline'
          },
          {
            id: '4',
            title: 'Review lead pipeline',
            dueDate: 'Dec 20',
            priority: 'low',
            type: 'follow-up'
          }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'error':
        return <AlertTriangle className="text-red-500" size={16} />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contact':
        return <Users size={16} />;
      case 'lead':
        return <Target size={16} />;
      case 'company':
        return <Building size={16} />;
      case 'chat':
        return <MessageCircle size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'follow-up':
        return <MessageCircle size={16} />;
      case 'meeting':
        return <Calendar size={16} />;
      case 'deadline':
        return <Clock size={16} />;
      default:
        return <FileText size={16} />;
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

  return (
    <SecureRoute>
      <SecureDashboard>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-900/20 border border-blue-500/20 rounded-lg px-4 py-2">
                <Calendar className="text-blue-500" size={20} />
                <span className="text-blue-400 text-sm">Today</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Contacts</p>
                  <p className="text-2xl font-bold text-white">{stats.totalContacts}</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Users className="text-white" size={24} />
                </div>
          </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-green-500 text-sm ml-2">+5 this week</span>
            </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Leads</p>
                  <p className="text-2xl font-bold text-white">{stats.totalLeads}</p>
            </div>
                <div className="bg-green-600 p-3 rounded-lg">
                  <Target className="text-white" size={24} />
        </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-green-500 text-sm ml-2">+2 new leads</span>
              </div>
              </div>
              
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Companies</p>
                  <p className="text-2xl font-bold text-white">{stats.totalCompanies}</p>
                </div>
                <div className="bg-purple-600 p-3 rounded-lg">
                  <Building className="text-white" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-green-500 text-sm ml-2">+1 new company</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Chats</p>
                  <p className="text-2xl font-bold text-white">{stats.activeChats}</p>
          </div>
                <div className="bg-yellow-600 p-3 rounded-lg">
                  <MessageCircle className="text-white" size={24} />
        </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingDown className="text-red-500" size={16} />
                <span className="text-red-500 text-sm ml-2">-1 from yesterday</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <Users size={20} className="text-white" />
                    <span className="text-white">Add Contact</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                    <Target size={20} className="text-white" />
                    <span className="text-white">Create Lead</span>
                    </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                    <Building size={20} className="text-white" />
                    <span className="text-white">Add Company</span>
                    </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors">
                    <MessageCircle size={20} className="text-white" />
                    <span className="text-white">Start AI Chat</span>
                    </button>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {stats.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(activity.status)}
                        {getActivityIcon(activity.type)}
                    </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.message}</p>
                        <p className="text-gray-400 text-xs">{activity.timestamp}</p>
                  </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Upcoming Tasks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                  <div className={`p-2 rounded-lg ${getPriorityColor(task.priority).replace('text-', 'bg-').replace('-500', '-600')}`}>
                    {getTaskIcon(task.type)}
                    </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{task.title}</p>
                    <p className="text-gray-400 text-xs">Due: {task.dueDate}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)} bg-opacity-20`}>
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
} 
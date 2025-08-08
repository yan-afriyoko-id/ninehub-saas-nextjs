"use client";

import { useState, useEffect } from "react";
import SecureRoute from "../components/SecureRoute";
import SecureDashboard from "../components/SecureDashboard";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  MoreVertical,
  Building,
  Users,
  Target,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  DollarSign,
} from "lucide-react";

interface CRMData {
  companies: Array<{
    id: string;
    name: string;
    industry: string;
    website: string;
    email: string;
    phone: string;
    address: string;
    status: "active" | "inactive" | "prospect";
    revenue: number;
    employees: number;
    createdAt: string;
    updatedAt: string;
  }>;
  contacts: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    company: string;
    status: "active" | "inactive" | "lead";
    lastContact: string;
    createdAt: string;
    updatedAt: string;
  }>;
  leads: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    source: string;
    status: "new" | "contacted" | "qualified" | "proposal" | "closed" | "lost";
    value: number;
    assignedTo: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

export default function CRMPage() {
  const [crmData, setCrmData] = useState<CRMData>({
    companies: [],
    contacts: [],
    leads: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "companies" | "contacts" | "leads"
  >("overview");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyData: CRMData = {
        companies: [
          {
            id: "1",
            name: "Acme Corporation",
            industry: "Technology",
            website: "https://acme.com",
            email: "info@acme.com",
            phone: "+6281234567890",
            address: "Jl. Business No. 1, Jakarta",
            status: "active",
            revenue: 5000000000,
            employees: 150,
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-20T14:30:00Z",
          },
          {
            id: "2",
            name: "TechStart Inc",
            industry: "Software",
            website: "https://techstart.com",
            email: "hello@techstart.com",
            phone: "+6281234567891",
            address: "Jl. Technology No. 2, Bandung",
            status: "prospect",
            revenue: 2000000000,
            employees: 75,
            createdAt: "2024-01-10T09:00:00Z",
            updatedAt: "2024-01-18T16:45:00Z",
          },
          {
            id: "3",
            name: "Global Solutions",
            industry: "Consulting",
            website: "https://globalsolutions.com",
            email: "contact@globalsolutions.com",
            phone: "+6281234567892",
            address: "Jl. International No. 3, Surabaya",
            status: "active",
            revenue: 8000000000,
            employees: 300,
            createdAt: "2024-01-12T11:30:00Z",
            updatedAt: "2024-01-19T13:20:00Z",
          },
        ],
        contacts: [
          {
            id: "1",
            name: "John Smith",
            email: "john.smith@acme.com",
            phone: "+6281234567890",
            position: "CEO",
            company: "Acme Corporation",
            status: "active",
            lastContact: "2024-01-20T10:30:00Z",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-20T14:30:00Z",
          },
          {
            id: "2",
            name: "Jane Doe",
            email: "jane.doe@techstart.com",
            phone: "+6281234567891",
            position: "CTO",
            company: "TechStart Inc",
            status: "lead",
            lastContact: "2024-01-19T15:20:00Z",
            createdAt: "2024-01-10T09:00:00Z",
            updatedAt: "2024-01-18T16:45:00Z",
          },
          {
            id: "3",
            name: "Bob Johnson",
            email: "bob.johnson@globalsolutions.com",
            phone: "+6281234567892",
            position: "Director",
            company: "Global Solutions",
            status: "active",
            lastContact: "2024-01-20T08:15:00Z",
            createdAt: "2024-01-12T11:30:00Z",
            updatedAt: "2024-01-19T13:20:00Z",
          },
        ],
        leads: [
          {
            id: "1",
            name: "Alice Brown",
            email: "alice.brown@newcompany.com",
            phone: "+6281234567893",
            company: "New Company Ltd",
            source: "Website",
            status: "qualified",
            value: 50000000,
            assignedTo: "John Doe",
            createdAt: "2024-01-15T14:20:00Z",
            updatedAt: "2024-01-20T09:15:00Z",
          },
          {
            id: "2",
            name: "Charlie Wilson",
            email: "charlie.wilson@startup.com",
            phone: "+6281234567894",
            company: "Startup Inc",
            source: "Referral",
            status: "contacted",
            value: 25000000,
            assignedTo: "Jane Smith",
            createdAt: "2024-01-16T11:00:00Z",
            updatedAt: "2024-01-19T16:30:00Z",
          },
          {
            id: "3",
            name: "Diana Davis",
            email: "diana.davis@enterprise.com",
            phone: "+6281234567895",
            company: "Enterprise Corp",
            source: "LinkedIn",
            status: "new",
            value: 100000000,
            assignedTo: "Bob Johnson",
            createdAt: "2024-01-17T09:30:00Z",
            updatedAt: "2024-01-20T12:45:00Z",
          },
        ],
      };
      setCrmData(dummyData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      active: "text-green-500",
      inactive: "text-red-500",
      prospect: "text-yellow-500",
      lead: "text-blue-500",
      new: "text-gray-500",
      contacted: "text-blue-500",
      qualified: "text-yellow-500",
      proposal: "text-purple-500",
      closed: "text-green-500",
      lost: "text-red-500",
    };
    return colorMap[status] || "text-gray-500";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "closed":
        return <CheckCircle className="text-green-500" size={16} />;
      case "inactive":
      case "lost":
        return <XCircle className="text-red-500" size={16} />;
      case "prospect":
      case "qualified":
        return <AlertTriangle className="text-yellow-500" size={16} />;
      default:
        return <Eye className="text-blue-500" size={16} />;
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
              <h1 className="text-3xl font-bold text-white">CRM Dashboard</h1>
              <p className="text-gray-400">
                Manage your customer relationships
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search CRM..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Plus size={20} />
                <span>Add New</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
            {[
              { id: "overview", label: "Overview", icon: <Target size={16} /> },
              {
                id: "companies",
                label: "Companies",
                icon: <Building size={16} />,
              },
              { id: "contacts", label: "Contacts", icon: <Users size={16} /> },
              { id: "leads", label: "Leads", icon: <Target size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as "overview" | "companies" | "contacts" | "leads"
                  )
                }
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content based on active tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Companies</p>
                      <p className="text-2xl font-bold text-white">
                        {crmData.companies.length}
                      </p>
                    </div>
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <Building className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingUp className="text-green-500" size={16} />
                    <span className="text-green-500 text-sm ml-2">
                      +2 this month
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Contacts</p>
                      <p className="text-2xl font-bold text-white">
                        {crmData.contacts.length}
                      </p>
                    </div>
                    <div className="bg-green-600 p-3 rounded-lg">
                      <Users className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingUp className="text-green-500" size={16} />
                    <span className="text-green-500 text-sm ml-2">
                      +5 this month
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Active Leads</p>
                      <p className="text-2xl font-bold text-white">
                        {
                          crmData.leads.filter(
                            (l) => l.status !== "closed" && l.status !== "lost"
                          ).length
                        }
                      </p>
                    </div>
                    <div className="bg-yellow-600 p-3 rounded-lg">
                      <Target className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingUp className="text-green-500" size={16} />
                    <span className="text-green-500 text-sm ml-2">
                      +3 this month
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Value</p>
                      <p className="text-2xl font-bold text-white">
                        {formatCurrency(
                          crmData.leads.reduce(
                            (total, lead) => total + lead.value,
                            0
                          )
                        )}
                      </p>
                    </div>
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <DollarSign className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingUp className="text-green-500" size={16} />
                    <span className="text-green-500 text-sm ml-2">
                      +15% this month
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Recent Companies
                  </h3>
                  <div className="space-y-4">
                    {crmData.companies.slice(0, 3).map((company) => (
                      <div
                        key={company.id}
                        className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Building className="text-blue-500" size={20} />
                          <div>
                            <p className="text-white font-medium">
                              {company.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {company.industry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(company.status)}
                          <span
                            className={`text-sm ${getStatusColor(
                              company.status
                            )}`}
                          >
                            {company.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Recent Leads
                  </h3>
                  <div className="space-y-4">
                    {crmData.leads.slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Target className="text-yellow-500" size={20} />
                          <div>
                            <p className="text-white font-medium">
                              {lead.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {lead.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(lead.status)}
                          <span
                            className={`text-sm ${getStatusColor(lead.status)}`}
                          >
                            {lead.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "companies" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Companies</h2>
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Plus size={20} />
                  <span>Add Company</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crmData.companies.map((company) => (
                  <div
                    key={company.id}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                          <Building size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {company.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {company.industry}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(company.status)}
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Revenue:</span>
                        <span className="text-white font-medium">
                          {formatCurrency(company.revenue)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Employees:</span>
                        <span className="text-white font-medium">
                          {company.employees}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Status:</span>
                        <span className={getStatusColor(company.status)}>
                          {company.status.charAt(0).toUpperCase() +
                            company.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center text-xs text-gray-300">
                        <Mail className="mr-2" size={12} />
                        <span className="truncate">{company.email}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-300">
                        <Phone className="mr-2" size={12} />
                        <span>{company.phone}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-300">
                        <MapPin className="mr-2" size={12} />
                        <span className="truncate">{company.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-700">
                      <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Eye size={14} />
                        <span>View</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Contacts</h2>
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Plus size={20} />
                  <span>Add Contact</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crmData.contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                          <Users size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {contact.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {contact.position}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(contact.status)}
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Company:</span>
                        <span className="text-white font-medium">
                          {contact.company}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Status:</span>
                        <span className={getStatusColor(contact.status)}>
                          {contact.status.charAt(0).toUpperCase() +
                            contact.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Last Contact:</span>
                        <span className="text-white font-medium">
                          {formatDate(contact.lastContact)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center text-xs text-gray-300">
                        <Mail className="mr-2" size={12} />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-300">
                        <Phone className="mr-2" size={12} />
                        <span>{contact.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-700">
                      <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Eye size={14} />
                        <span>View</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Leads</h2>
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Plus size={20} />
                  <span>Add Lead</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crmData.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-yellow-600 p-2 rounded-lg">
                          <Target size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {lead.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {lead.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(lead.status)}
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Value:</span>
                        <span className="text-white font-medium">
                          {formatCurrency(lead.value)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Source:</span>
                        <span className="text-white font-medium">
                          {lead.source}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Status:</span>
                        <span className={getStatusColor(lead.status)}>
                          {lead.status.charAt(0).toUpperCase() +
                            lead.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Assigned:</span>
                        <span className="text-white font-medium">
                          {lead.assignedTo}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center text-xs text-gray-300">
                        <Mail className="mr-2" size={12} />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-300">
                        <Phone className="mr-2" size={12} />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-300">
                        <Calendar className="mr-2" size={12} />
                        <span>Created: {formatDate(lead.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-700">
                      <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Eye size={14} />
                        <span>View</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
}

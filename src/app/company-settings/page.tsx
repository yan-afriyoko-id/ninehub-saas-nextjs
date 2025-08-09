"use client";

import { useState, useEffect } from "react";
import SecureRoute from "../components/SecureRoute";
import SecureDashboard from "../components/SecureDashboard";
import { apiClient } from "../services/api";
import { useAuth } from "../components/AuthContext";
import {
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  logo?: string;
  industry?: string;
  size?: string;
  founded?: string;
  description?: string;
  status: "active" | "inactive";
  subscription?: {
    plan: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  settings?: {
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
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Company>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to get company data from API
        const response = await apiClient.me();

        if (response.success && response.data) {
          // Transform API data to Company format - only use real data
          const companyData: Company = {
            id: String(response.data.id ?? user?.id ?? ""),
            name: response.data.name || "Company Name",
            email: response.data.email || user?.email || "",
            phone: undefined,
            website: undefined,
            address: undefined,
            logo: undefined,
            industry: undefined,
            size: undefined,
            founded: undefined,
            description: undefined,
            status: "active",
            subscription: {
              plan: "Basic Plan",
              startDate: new Date().toISOString(),
              endDate: new Date(
                Date.now() + 365 * 24 * 60 * 60 * 1000
              ).toISOString(),
              status: "active",
            },
            settings: {
              timezone: "Asia/Jakarta",
              language: "en",
              currency: "IDR",
              dateFormat: "DD/MM/YYYY",
              notifications: true,
              autoBackup: true,
              twoFactorAuth: true,
            },
          };

          setCompany(companyData);
          setEditForm(companyData);
        } else {
          throw new Error(response.message || "Failed to load company data");
        }
      } catch (error) {
        console.error("Error loading company data:", error);
        setError("Failed to load company data");

        // Fallback to minimal company data
        const fallbackCompany: Company = {
          id: String(user?.id ?? ""),
          name: "Company Name",
          email: user?.email || "",
          status: "active",
          subscription: {
            plan: "Basic Plan",
            startDate: new Date().toISOString(),
            endDate: new Date(
              Date.now() + 365 * 24 * 60 * 60 * 1000
            ).toISOString(),
            status: "active",
          },
          settings: {
            timezone: "Asia/Jakarta",
            language: "en",
            currency: "IDR",
            dateFormat: "DD/MM/YYYY",
            notifications: true,
            autoBackup: true,
            twoFactorAuth: true,
          },
        };

        setCompany(fallbackCompany);
        setEditForm(fallbackCompany);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompanyData();
  }, [user]);

  const handleSave = async () => {
    if (company) {
      try {
        setIsLoading(true);

        // Prepare data for API update - only send fields that have values
        const updateData: Record<string, string> = {};
        if (editForm.name) updateData.name = editForm.name;
        if (editForm.email) updateData.email = editForm.email;
        if (editForm.phone) updateData.phone = editForm.phone;
        if (editForm.website) updateData.website = editForm.website;
        if (editForm.address) updateData.address = editForm.address;
        if (editForm.industry) updateData.industry = editForm.industry;
        if (editForm.size) updateData.size = editForm.size;
        if (editForm.founded) updateData.founded = editForm.founded;
        if (editForm.description) updateData.description = editForm.description;

        // Update company data via API
        const response = await apiClient.updateMyProfile(updateData);

        if (response.success && response.data) {
          setCompany({ ...company, ...editForm });
          setIsEditing(false);
          setError(null);
        } else {
          throw new Error(response.message || "Failed to update company data");
        }
      } catch (error) {
        console.error("Error updating company data:", error);
        setError("Failed to update company data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    if (company) {
      setEditForm(company);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
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

  if (!company) {
    return (
      <SecureRoute adminOnly={true}>
        <SecureDashboard>
          <div className="text-center py-12">
            <Building className="mx-auto text-gray-400" size={48} />
            <h3 className="text-lg font-semibold text-white mt-4">
              Company data not found
            </h3>
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
              <h1 className="text-3xl font-bold text-white">
                Company Settings
              </h1>
              <p className="text-gray-400">
                Manage your company information and preferences
              </p>
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
                <span>Edit Company</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Building size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {company.name}
                  </h3>
                  <p className="text-gray-400">
                    {company.industry || "Industry"}
                  </p>
                  {company.size && (
                    <p className="text-gray-400 text-sm">{company.size}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-gray-400" size={16} />
                    <span className="text-gray-300">{company.email}</span>
                  </div>
                  {company.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="text-gray-400" size={16} />
                      <span className="text-gray-300">{company.phone}</span>
                    </div>
                  )}
                  {company.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="text-gray-400" size={16} />
                      <span className="text-gray-300">{company.website}</span>
                    </div>
                  )}
                  {company.address && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-gray-400" size={16} />
                      <span className="text-gray-300">{company.address}</span>
                    </div>
                  )}
                  {company.founded && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="text-gray-400" size={16} />
                      <span className="text-gray-300">
                        Founded {formatDate(company.founded)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Company Name
                    </label>
                    <p className="text-white">{company.name}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Email
                    </label>
                    <p className="text-white">{company.email}</p>
                  </div>
                  {company.phone && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Phone
                      </label>
                      <p className="text-white">{company.phone}</p>
                    </div>
                  )}
                  {company.website && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Website
                      </label>
                      <p className="text-white">{company.website}</p>
                    </div>
                  )}
                  {company.industry && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Industry
                      </label>
                      <p className="text-white">{company.industry}</p>
                    </div>
                  )}
                  {company.size && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Company Size
                      </label>
                      <p className="text-white">{company.size}</p>
                    </div>
                  )}
                  {company.founded && (
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Founded
                      </label>
                      <p className="text-white">
                        {formatDate(company.founded)}
                      </p>
                    </div>
                  )}
                  {company.address && (
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">
                        Address
                      </label>
                      <p className="text-white">{company.address}</p>
                    </div>
                  )}
                  {company.description && (
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">
                        Description
                      </label>
                      <p className="text-gray-300">{company.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Subscription Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Subscription Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Plan
                    </label>
                    <p className="text-white">{company.subscription?.plan}</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Status
                    </label>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {company.subscription?.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Start Date
                    </label>
                    <p className="text-white">
                      {company.subscription?.startDate
                        ? formatDate(company.subscription.startDate)
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      End Date
                    </label>
                    <p className="text-white">
                      {company.subscription?.endDate
                        ? formatDate(company.subscription.endDate)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              {isEditing && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Edit Company
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, phone: e.target.value })
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={editForm.website || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, website: e.target.value })
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Industry
                      </label>
                      <input
                        type="text"
                        value={editForm.industry || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, industry: e.target.value })
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Company Size
                      </label>
                      <input
                        type="text"
                        value={editForm.size || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, size: e.target.value })
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Founded
                      </label>
                      <input
                        type="date"
                        value={editForm.founded || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, founded: e.target.value })
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">
                        Address
                      </label>
                      <textarea
                        value={editForm.address || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, address: e.target.value })
                        }
                        rows={3}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">
                        Description
                      </label>
                      <textarea
                        value={editForm.description || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
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

"use client";

import { useState, useEffect } from "react";
import SecureRoute from "../../components/SecureRoute";
import SecureDashboard from "../../components/SecureDashboard";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Key,
  Shield,
  AlertTriangle,
} from "lucide-react";
import type { Permission as PermissionResource } from "../../services/types";

type Permission = PermissionResource & { module: string };

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGuard, setFilterGuard] = useState<"all" | "web" | "api">("all");
  const [filterModule, setFilterModule] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null
  );

  useEffect(() => {
    setTimeout(() => {
      const dummyPermissions: Permission[] = [
        {
          id: 1,
          name: "user.view",
          guard_name: "web",
          module: "user-management",
          created_at: "2024-01-15T10:00:00Z",
          updated_at: "2024-01-20T14:30:00Z",
        },
        {
          id: 2,
          name: "user.create",
          guard_name: "web",
          module: "user-management",
          created_at: "2024-01-15T10:00:00Z",
          updated_at: "2024-01-20T14:30:00Z",
        },
        {
          id: 3,
          name: "user.edit",
          guard_name: "web",
          module: "user-management",
          created_at: "2024-01-15T10:00:00Z",
          updated_at: "2024-01-20T14:30:00Z",
        },
        {
          id: 4,
          name: "user.delete",
          guard_name: "web",
          module: "user-management",
          created_at: "2024-01-15T10:00:00Z",
          updated_at: "2024-01-20T14:30:00Z",
        },
        {
          id: 5,
          name: "tenant.view",
          guard_name: "web",
          module: "tenant-management",
          created_at: "2024-01-10T09:00:00Z",
          updated_at: "2024-01-18T16:45:00Z",
        },
        {
          id: 6,
          name: "tenant.create",
          guard_name: "web",
          module: "tenant-management",
          created_at: "2024-01-10T09:00:00Z",
          updated_at: "2024-01-18T16:45:00Z",
        },
        {
          id: 7,
          name: "plan.view",
          guard_name: "web",
          module: "plan-management",
          created_at: "2024-01-12T11:30:00Z",
          updated_at: "2024-01-19T13:20:00Z",
        },
        {
          id: 8,
          name: "plan.create",
          guard_name: "web",
          module: "plan-management",
          created_at: "2024-01-12T11:30:00Z",
          updated_at: "2024-01-19T13:20:00Z",
        },
        {
          id: 9,
          name: "chat.send",
          guard_name: "web",
          module: "ai-chat",
          created_at: "2024-01-05T14:20:00Z",
          updated_at: "2024-01-16T09:15:00Z",
        },
        {
          id: 10,
          name: "chat.history",
          guard_name: "web",
          module: "ai-chat",
          created_at: "2024-01-05T14:20:00Z",
          updated_at: "2024-01-16T09:15:00Z",
        },
      ];
      setPermissions(dummyPermissions);
      setFilteredPermissions(dummyPermissions);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = permissions;

    if (searchTerm) {
      filtered = filtered.filter(
        (permission) =>
          permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          permission.module.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterGuard !== "all") {
      filtered = filtered.filter(
        (permission) => permission.guard_name === filterGuard
      );
    }

    if (filterModule !== "all") {
      filtered = filtered.filter(
        (permission) => permission.module === filterModule
      );
    }

    setFilteredPermissions(filtered);
  }, [permissions, searchTerm, filterGuard, filterModule]);

  const handleDeletePermission = (permissionId: number) => {
    if (confirm("Are you sure you want to delete this permission?")) {
      setPermissions((prev) =>
        prev.filter((permission) => permission.id !== permissionId)
      );
    }
  };

  const getModuleColor = (module: string) => {
    const colorMap: { [key: string]: string } = {
      "user-management": "bg-blue-600",
      "tenant-management": "bg-green-600",
      "plan-management": "bg-purple-600",
      "ai-chat": "bg-pink-600",
      crm: "bg-yellow-600",
    };
    return colorMap[module] || "bg-gray-600";
  };

  const uniqueModules = Array.from(new Set(permissions.map((p) => p.module)));

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
              <h1 className="text-3xl font-bold text-white">
                Permission Management
              </h1>
              <p className="text-gray-400">
                Manage system permissions and access controls
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Add Permission</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterGuard}
              onChange={(e) =>
                setFilterGuard(e.target.value as "all" | "web" | "api")
              }
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Guards</option>
              <option value="web">Web</option>
              <option value="api">API</option>
            </select>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Modules</option>
              {uniqueModules.map((module) => (
                <option key={module} value={module}>
                  {module}
                </option>
              ))}
            </select>
          </div>

          {/* Permissions Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Permission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Module
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Guard
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {filteredPermissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Key className="text-blue-500 mr-2" size={16} />
                          <div>
                            <div className="text-sm font-medium text-white">
                              {permission.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              ID: {permission.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getModuleColor(
                            permission.module
                          )} text-white`}
                        >
                          {permission.module}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">
                          {permission.guard_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">
                          {permission.action || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setEditingPermission(permission)}
                            className="text-blue-400 hover:text-blue-300 p-1"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeletePermission(permission.id)
                            }
                            className="text-red-400 hover:text-red-300 p-1"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {filteredPermissions.length === 0 && (
            <div className="text-center py-12">
              <Key className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-white mt-4">
                No permissions found
              </h3>
              <p className="text-gray-400 mt-2">
                {searchTerm || filterGuard !== "all" || filterModule !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first permission."}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Permissions</p>
                  <p className="text-2xl font-bold text-white">
                    {permissions.length}
                  </p>
                </div>
                <Key className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Web Guard</p>
                  <p className="text-2xl font-bold text-white">
                    {permissions.filter((p) => p.guard_name === "web").length}
                  </p>
                </div>
                <Shield className="text-purple-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Modules</p>
                  <p className="text-2xl font-bold text-white">
                    {uniqueModules.length}
                  </p>
                </div>
                <AlertTriangle className="text-yellow-500" size={24} />
              </div>
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
}

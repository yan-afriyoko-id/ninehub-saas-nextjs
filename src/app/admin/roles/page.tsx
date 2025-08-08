"use client";

import { useState, useEffect } from "react";
import SecureRoute from "../../components/SecureRoute";
import SecureDashboard from "../../components/SecureDashboard";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  MoreVertical,
  Shield,
  Users,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Key,
  Crown,
} from "lucide-react";

interface Role {
  id: string;
  name: string;
  guardName: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGuard, setFilterGuard] = useState<"all" | "web" | "api">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyRoles: Role[] = [
        {
          id: "1",
          name: "super-admin",
          guardName: "web",
          description: "Full system administrator with all permissions",
          permissions: [
            "user.view",
            "user.create",
            "user.edit",
            "user.delete",
            "tenant.view",
            "tenant.create",
            "tenant.edit",
            "tenant.delete",
            "plan.view",
            "plan.create",
            "plan.edit",
            "plan.delete",
          ],
          isActive: true,
          userCount: 2,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-20T14:30:00Z",
        },
        {
          id: "2",
          name: "admin",
          guardName: "web",
          description: "Administrator with limited system access",
          permissions: [
            "user.view",
            "user.create",
            "user.edit",
            "tenant.view",
            "tenant.create",
            "plan.view",
          ],
          isActive: true,
          userCount: 5,
          createdAt: "2024-01-05T10:00:00Z",
          updatedAt: "2024-01-18T16:45:00Z",
        },
        {
          id: "3",
          name: "tenant",
          guardName: "web",
          description: "Tenant user with CRM access",
          permissions: [
            "crm.view",
            "crm.create",
            "crm.edit",
            "chat.send",
            "chat.history",
          ],
          isActive: true,
          userCount: 45,
          createdAt: "2024-01-10T09:00:00Z",
          updatedAt: "2024-01-17T10:30:00Z",
        },
        {
          id: "4",
          name: "user",
          guardName: "web",
          description: "Basic user with limited access",
          permissions: ["profile.view", "profile.edit", "chat.send"],
          isActive: true,
          userCount: 120,
          createdAt: "2024-01-12T11:30:00Z",
          updatedAt: "2024-01-19T13:20:00Z",
        },
        {
          id: "5",
          name: "guest",
          guardName: "web",
          description: "Guest user with minimal access",
          permissions: ["chat.send"],
          isActive: false,
          userCount: 0,
          createdAt: "2024-01-15T14:20:00Z",
          updatedAt: "2024-01-16T09:15:00Z",
        },
      ];
      setRoles(dummyRoles);
      setFilteredRoles(dummyRoles);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = roles;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (role) =>
          role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by guard
    if (filterGuard !== "all") {
      filtered = filtered.filter((role) => role.guardName === filterGuard);
    }

    setFilteredRoles(filtered);
  }, [roles, searchTerm, filterGuard]);

  const handleToggleStatus = (roleId: string) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === roleId ? { ...role, isActive: !role.isActive } : role
      )
    );
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      setRoles((prev) => prev.filter((role) => role.id !== roleId));
    }
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? (
      <CheckCircle className="text-green-500" size={16} />
    ) : (
      <XCircle className="text-red-500" size={16} />
    );
  };

  const getRoleColor = (roleName: string) => {
    const colorMap: { [key: string]: string } = {
      "super-admin": "bg-red-600",
      admin: "bg-blue-600",
      tenant: "bg-green-600",
      user: "bg-purple-600",
      guest: "bg-gray-600",
    };
    return colorMap[roleName] || "bg-gray-600";
  };

  const getRoleIcon = (roleName: string) => {
    switch (roleName) {
      case "super-admin":
        return <Crown size={16} />;
      case "admin":
        return <Shield size={16} />;
      case "tenant":
        return <Users size={16} />;
      case "user":
        return <Users size={16} />;
      case "guest":
        return <Eye size={16} />;
      default:
        return <Shield size={16} />;
    }
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
              <h1 className="text-3xl font-bold text-white">Role Management</h1>
              <p className="text-gray-400">
                Manage user roles and their permissions
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Add Role</span>
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
                placeholder="Search roles..."
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
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${getRoleColor(role.name)}`}
                    >
                      {getRoleIcon(role.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {role.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{role.guardName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(role.isActive)}
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{role.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Users:</span>
                    <span className="text-white font-medium">
                      {role.userCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Permissions:</span>
                    <span className="text-white font-medium">
                      {role.permissions.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Status:</span>
                    <span
                      className={`${
                        role.isActive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {role.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Permissions Preview */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-xs mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((permission, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-900/20 text-blue-400 border border-blue-500/20"
                      >
                        <Key size={10} className="mr-1" />
                        {permission}
                      </span>
                    ))}
                    {role.permissions.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-400">
                        +{role.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => setEditingRole(role)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleToggleStatus(role.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded text-sm transition-colors ${
                      role.isActive
                        ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {role.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span>{role.isActive ? "Disable" : "Enable"}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
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
          {filteredRoles.length === 0 && (
            <div className="text-center py-12">
              <Shield className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-white mt-4">
                No roles found
              </h3>
              <p className="text-gray-400 mt-2">
                {searchTerm || filterGuard !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first role."}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Roles</p>
                  <p className="text-2xl font-bold text-white">
                    {roles.length}
                  </p>
                </div>
                <Shield className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Roles</p>
                  <p className="text-2xl font-bold text-white">
                    {roles.filter((r) => r.isActive).length}
                  </p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">
                    {roles.reduce((total, role) => total + role.userCount, 0)}
                  </p>
                </div>
                <Users className="text-purple-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Permissions</p>
                  <p className="text-2xl font-bold text-white">
                    {roles.reduce(
                      (total, role) => total + role.permissions.length,
                      0
                    )}
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

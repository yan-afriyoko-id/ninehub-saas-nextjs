"use client";

import { useState } from "react";
import { useTenants } from "../../hooks/useTenants";
import type { Tenant } from "../../services/types";

export default function TenantsPage() {
  const {
    tenants,
    loading,
    error,
    creating,
    updating,
    deleting,
    createError,
    updateError,
    deleteError,
    createTenant,
    updateTenant,
    deleteTenant,
    fetchTenants,
  } = useTenants();

  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTenant = async (tenantData: Partial<Tenant>) => {
    await createTenant(tenantData);
    if (!createError) {
      setIsModalOpen(false);
      fetchTenants(); // Refresh list
    }
  };

  const handleUpdateTenant = async (
    id: number,
    tenantData: Partial<Tenant>
  ) => {
    await updateTenant(id, tenantData);
    if (!updateError) {
      setSelectedTenant(null);
      fetchTenants(); // Refresh list
    }
  };

  const handleDeleteTenant = async (id: number) => {
    await deleteTenant(id);
    if (!deleteError) {
      fetchTenants(); // Refresh list
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="text-white mt-4">Loading tenants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error</h1>
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchTenants}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Tenants Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={creating}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Add Tenant"}
          </button>
        </div>

        {/* Error Messages */}
        {(createError || updateError || deleteError) && (
          <div className="mb-4 p-4 bg-red-900 border border-red-700 rounded">
            <p className="text-red-200">
              {createError || updateError || deleteError}
            </p>
          </div>
        )}

        {/* Tenants List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants?.map((tenant) => (
            <div
              key={tenant.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {tenant.name}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    tenant.is_active
                      ? "bg-green-900 text-green-200"
                      : "bg-red-900 text-red-200"
                  }`}
                >
                  {tenant.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="space-y-2 text-gray-300">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {tenant.email || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {tenant.phone || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Users:</span>{" "}
                  {tenant.users_count}
                </p>
                <p>
                  <span className="font-medium">Modules:</span>{" "}
                  {tenant.modules_count}
                </p>
                <p>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(tenant.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSelectedTenant(tenant)}
                  disabled={updating}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {updating ? "Updating..." : "Edit"}
                </button>
                <button
                  onClick={() => handleDeleteTenant(tenant.id)}
                  disabled={deleting}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {tenants?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No tenants found</p>
          </div>
        )}
      </div>

      {/* Modal for Create/Edit Tenant */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">
              {selectedTenant ? "Edit Tenant" : "Create Tenant"}
            </h2>
            {/* Add your form here */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle form submission
                  setIsModalOpen(false);
                }}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {selectedTenant ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

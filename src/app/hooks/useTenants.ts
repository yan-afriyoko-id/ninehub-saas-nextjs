import { useEffect } from "react";
import { useApi } from "./useApi";
import { apiClient } from "../services/api";
import type { Tenant } from "../services/types";

export function useTenants() {
  const {
    data: tenants,
    loading,
    error,
    execute: fetchTenants,
    reset,
  } = useApi<Tenant[]>(apiClient.getTenants);

  const {
    data: createResult,
    loading: creating,
    error: createError,
    execute: createTenant,
    reset: resetCreate,
  } = useApi<Tenant>(apiClient.createTenant);

  const {
    data: updateResult,
    loading: updating,
    error: updateError,
    execute: updateTenant,
    reset: resetUpdate,
  } = useApi<Tenant>(apiClient.updateTenant);

  const {
    data: deleteResult,
    loading: deleting,
    error: deleteError,
    execute: deleteTenant,
    reset: resetDelete,
  } = useApi(apiClient.deleteTenant);

  // Auto-fetch on mount
  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  return {
    // Data
    tenants,

    // Loading states
    loading,
    creating,
    updating,
    deleting,

    // Error states
    error,
    createError,
    updateError,
    deleteError,

    // Actions
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant,

    // Reset functions
    reset,
    resetCreate,
    resetUpdate,
    resetDelete,
  };
}

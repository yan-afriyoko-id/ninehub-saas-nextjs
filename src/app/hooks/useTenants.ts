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
  } = useApi<Tenant[], []>(apiClient.getTenants);

  const {
    loading: creating,
    error: createError,
    execute: createTenant,
    reset: resetCreate,
  } = useApi<Tenant, [Partial<Tenant>]>(apiClient.createTenant);

  const {
    loading: updating,
    error: updateError,
    execute: updateTenant,
    reset: resetUpdate,
  } = useApi<Tenant, [number | string, Partial<Tenant>]>(
    apiClient.updateTenant
  );

  const {
    loading: deleting,
    error: deleteError,
    execute: deleteTenant,
    reset: resetDelete,
  } = useApi<unknown, [number | string]>(apiClient.deleteTenant);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  return {
    tenants,
    loading,
    creating,
    updating,
    deleting,
    error,
    createError,
    updateError,
    deleteError,
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant,
    reset,
    resetCreate,
    resetUpdate,
    resetDelete,
  };
}

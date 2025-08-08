import type { ApiResponse, Tenant } from "../types";

export interface TenantService {
  getTenants(): Promise<ApiResponse<Tenant[]>>;
  getTenantById(id: number): Promise<ApiResponse<Tenant>>;
  createTenant(
    tenant: Omit<Tenant, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Tenant>>;
  updateTenant(
    id: number,
    tenant: Partial<Tenant>
  ): Promise<ApiResponse<Tenant>>;
  deleteTenant(id: number): Promise<ApiResponse>;
  activateTenant(id: number): Promise<ApiResponse>;
  suspendTenant(id: number): Promise<ApiResponse>;
  getTenantStatistics(): Promise<
    ApiResponse<{
      total: number;
      active: number;
      inactive: number;
      byPlan: Record<string, number>;
    }>
  >;
}

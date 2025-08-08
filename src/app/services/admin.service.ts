import type { ApiResponse, Tenant } from "./types";
import { httpClient } from "./httpClient";

export interface AdminService {
  getTenants(): Promise<ApiResponse<Tenant[]>>;
  createTenant(tenantData: Partial<Tenant>): Promise<ApiResponse<Tenant>>;
  updateTenant(
    id: string | number,
    tenantData: Partial<Tenant>
  ): Promise<ApiResponse<Tenant>>;
  deleteTenant(id: string | number): Promise<ApiResponse>;
  activateTenant(id: string | number): Promise<ApiResponse>;
  suspendTenant(id: string | number): Promise<ApiResponse>;
}

export class HttpAdminService implements AdminService {
  getTenants(): Promise<ApiResponse<Tenant[]>> {
    return httpClient.request<Tenant[]>("/tenants");
  }

  createTenant(tenantData: Partial<Tenant>): Promise<ApiResponse<Tenant>> {
    return httpClient.request<Tenant>("/tenants", {
      method: "POST",
      body: JSON.stringify(tenantData),
    });
  }

  updateTenant(
    id: string | number,
    tenantData: Partial<Tenant>
  ): Promise<ApiResponse<Tenant>> {
    return httpClient.request<Tenant>(`/tenants/${id}`, {
      method: "PUT",
      body: JSON.stringify(tenantData),
    });
  }

  deleteTenant(id: string | number): Promise<ApiResponse> {
    return httpClient.request(`/tenants/${id}`, { method: "DELETE" });
  }

  activateTenant(id: string | number): Promise<ApiResponse> {
    return httpClient.request(`/tenants/${id}/activate`, { method: "PATCH" });
  }

  suspendTenant(id: string | number): Promise<ApiResponse> {
    return httpClient.request(`/tenants/${id}/suspend`, { method: "PATCH" });
  }
}

export const adminService: AdminService = new HttpAdminService();

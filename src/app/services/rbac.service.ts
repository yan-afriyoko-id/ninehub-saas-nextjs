import type { ApiResponse, Module, Permission, Role } from "./types";
import { httpClient } from "./httpClient";

export interface ModulesService {
  getModules(): Promise<ApiResponse<Module[]>>;
  createModule(
    module: Omit<Module, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Module>>;
  updateModule(
    id: number,
    module: Partial<Module>
  ): Promise<ApiResponse<Module>>;
  deleteModule(id: number): Promise<ApiResponse>;
}

export interface PermissionsService {
  getPermissions(): Promise<ApiResponse<Permission[]>>;
  createPermission(
    permission: Omit<Permission, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Permission>>;
  updatePermission(
    id: number,
    permission: Partial<Permission>
  ): Promise<ApiResponse<Permission>>;
  deletePermission(id: number): Promise<ApiResponse>;
}

export interface RolesService {
  getRoles(): Promise<ApiResponse<Role[]>>;
  createRole(
    role: Omit<Role, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Role>>;
  updateRole(id: number, role: Partial<Role>): Promise<ApiResponse<Role>>;
  deleteRole(id: number): Promise<ApiResponse>;
}

export class HttpModulesService implements ModulesService {
  getModules(): Promise<ApiResponse<Module[]>> {
    return httpClient.request<Module[]>("/modules");
  }
  createModule(
    module: Omit<Module, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Module>> {
    return httpClient.request<Module>("/modules", {
      method: "POST",
      body: JSON.stringify(module),
    });
  }
  updateModule(
    id: number,
    module: Partial<Module>
  ): Promise<ApiResponse<Module>> {
    return httpClient.request<Module>(`/modules/${id}`, {
      method: "PUT",
      body: JSON.stringify(module),
    });
  }
  deleteModule(id: number): Promise<ApiResponse> {
    return httpClient.request(`/modules/${id}`, { method: "DELETE" });
  }
}

export class HttpPermissionsService implements PermissionsService {
  getPermissions(): Promise<ApiResponse<Permission[]>> {
    return httpClient.request<Permission[]>("/permissions");
  }
  createPermission(
    permission: Omit<Permission, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Permission>> {
    return httpClient.request<Permission>("/permissions", {
      method: "POST",
      body: JSON.stringify(permission),
    });
  }
  updatePermission(
    id: number,
    permission: Partial<Permission>
  ): Promise<ApiResponse<Permission>> {
    return httpClient.request<Permission>(`/permissions/${id}`, {
      method: "PUT",
      body: JSON.stringify(permission),
    });
  }
  deletePermission(id: number): Promise<ApiResponse> {
    return httpClient.request(`/permissions/${id}`, { method: "DELETE" });
  }
}

export class HttpRolesService implements RolesService {
  getRoles(): Promise<ApiResponse<Role[]>> {
    return httpClient.request<Role[]>("/roles");
  }
  createRole(
    role: Omit<Role, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Role>> {
    return httpClient.request<Role>("/roles", {
      method: "POST",
      body: JSON.stringify(role),
    });
  }
  updateRole(id: number, role: Partial<Role>): Promise<ApiResponse<Role>> {
    return httpClient.request<Role>(`/roles/${id}`, {
      method: "PUT",
      body: JSON.stringify(role),
    });
  }
  deleteRole(id: number): Promise<ApiResponse> {
    return httpClient.request(`/roles/${id}`, { method: "DELETE" });
  }
}

export const modulesService: ModulesService = new HttpModulesService();
export const permissionsService: PermissionsService =
  new HttpPermissionsService();
export const rolesService: RolesService = new HttpRolesService();

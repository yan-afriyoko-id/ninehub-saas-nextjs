// API Service Layer for Laravel Backend
import { API_CONFIG } from "../config/api";

// Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  token: string;
  roles: string[];
  permissions: string[];
  profile?: Record<string, unknown>;
  tenant: {
    id: string;
    name: string;
    domains: string[];
  };
}

export interface ProfileResponse {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  profile?: Record<string, unknown>;
  tenant: {
    id: string;
    name: string;
    domains: string[];
  };
}

export interface TenantInfo {
  id: string;
  company: string | null;
  domains: string[];
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: 'active' | 'inactive';
  plan_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
  display_name: string;
  description: string;
  permissions: Permission[];
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  duration: string;
  features: string[];
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  avatar?: string;
  company_id?: string;
}

// API Client Class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private loadToken(): void {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  private setToken(token: string): void {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  private removeToken(): void {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // Return error response instead of throwing
        return {
          success: false,
          message: data.message || `HTTP error! status: ${response.status}`,
          errors: data.errors || {},
        };
      }

      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      // Return error response instead of throwing
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Network error occurred",
        errors: {},
      };
    }
  }

  // Authentication Methods
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout(): Promise<ApiResponse> {
    try {
      const response = await this.request("/logout", {
        method: "POST",
      });

      if (response.success) {
        this.removeToken();
      }

      return response;
    } catch (error) {
      return {
        success: false,
        message: "Failed to logout",
        errors: error as Record<string, string[]>,
      };
    }
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request<User>('/profiles');
  }

  async getProfileById(profileId: string): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<Record<string, unknown>>(`/profiles/${profileId}`);
  }

  async getMyProfile(): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<Record<string, unknown>>('/profiles/me');
  }

  async updateProfile(profileData: Record<string, unknown>): Promise<ApiResponse<User>> {
    return this.request<User>('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async updateMyProfile(profileData: Record<string, unknown>): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<Record<string, unknown>>('/profiles', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async updateProfileById(profileId: string, profileData: Record<string, unknown>): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<Record<string, unknown>>(`/profiles/${profileId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Admin Management
  async getTenants(): Promise<ApiResponse<Tenant[]>> {
    return this.request<Tenant[]>('/admin/tenants');
  }

  async createTenant(tenantData: Partial<Tenant>): Promise<ApiResponse<Tenant>> {
    return this.request<Tenant>('/admin/tenants', {
      method: 'POST',
      body: JSON.stringify(tenantData),
    });
  }

  async updateTenant(id: string, tenantData: Partial<Tenant>): Promise<ApiResponse<Tenant>> {
    return this.request<Tenant>(`/admin/tenants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tenantData),
    });
  }

  async deleteTenant(id: string): Promise<ApiResponse> {
    return this.request(`/admin/tenants/${id}`, {
      method: 'DELETE',
    });
  }

  // Modules CRUD
  async getModules(): Promise<ApiResponse<Module[]>> {
    return this.request<Module[]>("/modules");
  }

  async createModule(
    module: Omit<Module, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Module>> {
    return this.request<Module>("/modules", {
      method: "POST",
      body: JSON.stringify(module),
    });
  }

  async updateModule(
    id: number,
    module: Partial<Module>
  ): Promise<ApiResponse<Module>> {
    return this.request<Module>(`/modules/${id}`, {
      method: "PUT",
      body: JSON.stringify(module),
    });
  }

  async deleteModule(id: number): Promise<ApiResponse> {
    return this.request(`/modules/${id}`, {
      method: "DELETE",
    });
  }

  // Permissions CRUD
  async getPermissions(): Promise<ApiResponse<Permission[]>> {
    return this.request<Permission[]>("/permissions");
  }

  async createPermission(
    permission: Omit<Permission, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Permission>> {
    return this.request<Permission>("/permissions", {
      method: "POST",
      body: JSON.stringify(permission),
    });
  }

  async updatePermission(
    id: number,
    permission: Partial<Permission>
  ): Promise<ApiResponse<Permission>> {
    return this.request<Permission>(`/permissions/${id}`, {
      method: "PUT",
      body: JSON.stringify(permission),
    });
  }

  async deletePermission(id: number): Promise<ApiResponse> {
    return this.request(`/permissions/${id}`, {
      method: "DELETE",
    });
  }

  // Roles CRUD
  async getRoles(): Promise<ApiResponse<Role[]>> {
    return this.request<Role[]>("/roles");
  }

  async createRole(
    role: Omit<Role, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Role>> {
    return this.request<Role>("/roles", {
      method: "POST",
      body: JSON.stringify(role),
    });
  }

  async updateRole(
    id: number,
    role: Partial<Role>
  ): Promise<ApiResponse<Role>> {
    return this.request<Role>(`/roles/${id}`, {
      method: "PUT",
      body: JSON.stringify(role),
    });
  }

  async deleteRole(id: number): Promise<ApiResponse> {
    return this.request(`/roles/${id}`, {
      method: "DELETE",
    });
  }

  // Plans CRUD
  async getPlans(): Promise<ApiResponse<Plan[]>> {
    return this.request<Plan[]>("/plans");
  }

  async createPlan(
    plan: Omit<Plan, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Plan>> {
    return this.request<Plan>("/plans", {
      method: "POST",
      body: JSON.stringify(plan),
    });
  }

  async updatePlan(
    id: number,
    plan: Partial<Plan>
  ): Promise<ApiResponse<Plan>> {
    return this.request<Plan>(`/plans/${id}`, {
      method: "PUT",
      body: JSON.stringify(plan),
    });
  }

  async deletePlan(id: number): Promise<ApiResponse> {
    return this.request(`/plans/${id}`, {
      method: "DELETE",
    });
  }

  // Utility Methods
  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  // Chat API
  async sendChatMessage(message: string): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<Record<string, unknown>>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getChatHistory(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return this.request<Record<string, unknown>[]>('/chat/history');
  }

  async clearChatHistory(): Promise<ApiResponse> {
    return this.request('/chat/clear', {
      method: 'DELETE',
    });
  }

  async getConversation(conversationId: string): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<Record<string, unknown>>(`/chat/conversation/${conversationId}`);
  }

  async deleteConversation(conversationId: string): Promise<ApiResponse> {
    return this.request(`/chat/conversation/${conversationId}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_CONFIG.BASE_URL);

// Export types - remove duplicate exports since they're already exported above

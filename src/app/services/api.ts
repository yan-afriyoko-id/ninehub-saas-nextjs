// API Service Layer for Laravel Backend Integration
const API_BASE_URL = 'http://localhost:8000/api';

// Types
export interface ApiResponse<T = any> {
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
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'tenant';
    company: string;
    phone?: string;
    location?: string;
    join_date: string;
    subscription: {
      plan: string;
      status: string;
      start_date: string;
      end_date: string;
      price: string;
    };
    permissions: string[];
    menu_items: Array<{
      id: string;
      label: string;
      icon: string;
      path: string;
    }>;
  };
  token: string;
  token_type: string;
}

export interface Module {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
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
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
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
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  private removeToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Authentication Methods
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout(): Promise<ApiResponse> {
    try {
      await this.request('/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.removeToken();
    }

    return { success: true, message: 'Logged out successfully' };
  }

  async getProfile(): Promise<ApiResponse<LoginResponse['user']>> {
    return this.request<LoginResponse['user']>('/auth/profile');
  }

  // Modules CRUD
  async getModules(): Promise<ApiResponse<Module[]>> {
    return this.request<Module[]>('/modules');
  }

  async createModule(module: Omit<Module, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Module>> {
    return this.request<Module>('/modules', {
      method: 'POST',
      body: JSON.stringify(module),
    });
  }

  async updateModule(id: number, module: Partial<Module>): Promise<ApiResponse<Module>> {
    return this.request<Module>(`/modules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(module),
    });
  }

  async deleteModule(id: number): Promise<ApiResponse> {
    return this.request(`/modules/${id}`, {
      method: 'DELETE',
    });
  }

  // Permissions CRUD
  async getPermissions(): Promise<ApiResponse<Permission[]>> {
    return this.request<Permission[]>('/permissions');
  }

  async createPermission(permission: Omit<Permission, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Permission>> {
    return this.request<Permission>('/permissions', {
      method: 'POST',
      body: JSON.stringify(permission),
    });
  }

  async updatePermission(id: number, permission: Partial<Permission>): Promise<ApiResponse<Permission>> {
    return this.request<Permission>(`/permissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(permission),
    });
  }

  async deletePermission(id: number): Promise<ApiResponse> {
    return this.request(`/permissions/${id}`, {
      method: 'DELETE',
    });
  }

  // Roles CRUD
  async getRoles(): Promise<ApiResponse<Role[]>> {
    return this.request<Role[]>('/roles');
  }

  async createRole(role: Omit<Role, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Role>> {
    return this.request<Role>('/roles', {
      method: 'POST',
      body: JSON.stringify(role),
    });
  }

  async updateRole(id: number, role: Partial<Role>): Promise<ApiResponse<Role>> {
    return this.request<Role>(`/roles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(role),
    });
  }

  async deleteRole(id: number): Promise<ApiResponse> {
    return this.request(`/roles/${id}`, {
      method: 'DELETE',
    });
  }

  // Plans CRUD
  async getPlans(): Promise<ApiResponse<Plan[]>> {
    return this.request<Plan[]>('/plans');
  }

  async createPlan(plan: Omit<Plan, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Plan>> {
    return this.request<Plan>('/plans', {
      method: 'POST',
      body: JSON.stringify(plan),
    });
  }

  async updatePlan(id: number, plan: Partial<Plan>): Promise<ApiResponse<Plan>> {
    return this.request<Plan>(`/plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(plan),
    });
  }

  async deletePlan(id: number): Promise<ApiResponse> {
    return this.request(`/plans/${id}`, {
      method: 'DELETE',
    });
  }

  // Utility Methods
  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types
export type { ApiResponse, LoginRequest, LoginResponse, Module, Permission, Role, Plan }; 
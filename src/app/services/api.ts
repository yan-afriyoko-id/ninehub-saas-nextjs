// API Service Layer for Laravel Backend
import { API_CONFIG, getApiUrl } from '../config/api';

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
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
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: string;
  name: string;
  guard_name: string;
  module_id?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  guard_name: string;
  permissions?: Permission[];
  users_count?: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  features: string[];
  status: 'active' | 'inactive';
  subscribers_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  industry?: string;
  size?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company_id?: string;
  position?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company_id?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost';
  created_at: string;
  updated_at: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  last_message?: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

// API Service Class
class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = getApiUrl(endpoint);
      console.log('Making API request to:', url); // Debug log
      
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders(),
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data); // Debug log

      return data;
    } catch (error) {
      console.error('API Error:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Unable to connect to the server. Please check if the backend is running.');
      }
      throw error;
    }
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data?.token) {
      this.token = response.data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
      }
    }

    return response;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data?.token) {
      this.token = response.data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
      }
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
      this.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    }

    return { success: true };
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/profile');
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

  async getModules(): Promise<ApiResponse<Module[]>> {
    return this.request<Module[]>('/admin/modules');
  }

  async createModule(moduleData: Partial<Module>): Promise<ApiResponse<Module>> {
    return this.request<Module>('/admin/modules', {
      method: 'POST',
      body: JSON.stringify(moduleData),
    });
  }

  async updateModule(id: string, moduleData: Partial<Module>): Promise<ApiResponse<Module>> {
    return this.request<Module>(`/admin/modules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(moduleData),
    });
  }

  async deleteModule(id: string): Promise<ApiResponse> {
    return this.request(`/admin/modules/${id}`, {
      method: 'DELETE',
    });
  }

  async getPermissions(): Promise<ApiResponse<Permission[]>> {
    return this.request<Permission[]>('/admin/permissions');
  }

  async createPermission(permissionData: Partial<Permission>): Promise<ApiResponse<Permission>> {
    return this.request<Permission>('/admin/permissions', {
      method: 'POST',
      body: JSON.stringify(permissionData),
    });
  }

  async updatePermission(id: string, permissionData: Partial<Permission>): Promise<ApiResponse<Permission>> {
    return this.request<Permission>(`/admin/permissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(permissionData),
    });
  }

  async deletePermission(id: string): Promise<ApiResponse> {
    return this.request(`/admin/permissions/${id}`, {
      method: 'DELETE',
    });
  }

  async getRoles(): Promise<ApiResponse<Role[]>> {
    return this.request<Role[]>('/admin/roles');
  }

  async createRole(roleData: Partial<Role>): Promise<ApiResponse<Role>> {
    return this.request<Role>('/admin/roles', {
      method: 'POST',
      body: JSON.stringify(roleData),
    });
  }

  async updateRole(id: string, roleData: Partial<Role>): Promise<ApiResponse<Role>> {
    return this.request<Role>(`/admin/roles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(roleData),
    });
  }

  async deleteRole(id: string): Promise<ApiResponse> {
    return this.request(`/admin/roles/${id}`, {
      method: 'DELETE',
    });
  }

  async getPlans(): Promise<ApiResponse<Plan[]>> {
    return this.request<Plan[]>('/admin/plans');
  }

  async createPlan(planData: Partial<Plan>): Promise<ApiResponse<Plan>> {
    return this.request<Plan>('/admin/plans', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  }

  async updatePlan(id: string, planData: Partial<Plan>): Promise<ApiResponse<Plan>> {
    return this.request<Plan>(`/admin/plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(planData),
    });
  }

  async deletePlan(id: string): Promise<ApiResponse> {
    return this.request(`/admin/plans/${id}`, {
      method: 'DELETE',
    });
  }

  // CRM
  async getCompanies(): Promise<ApiResponse<Company[]>> {
    return this.request<Company[]>('/companies');
  }

  async createCompany(companyData: Partial<Company>): Promise<ApiResponse<Company>> {
    return this.request<Company>('/companies', {
      method: 'POST',
      body: JSON.stringify(companyData),
    });
  }

  async updateCompany(id: string, companyData: Partial<Company>): Promise<ApiResponse<Company>> {
    return this.request<Company>(`/companies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(companyData),
    });
  }

  async deleteCompany(id: string): Promise<ApiResponse> {
    return this.request(`/companies/${id}`, {
      method: 'DELETE',
    });
  }

  async getContacts(): Promise<ApiResponse<Contact[]>> {
    return this.request<Contact[]>('/contacts');
  }

  async createContact(contactData: Partial<Contact>): Promise<ApiResponse<Contact>> {
    return this.request<Contact>('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async updateContact(id: string, contactData: Partial<Contact>): Promise<ApiResponse<Contact>> {
    return this.request<Contact>(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    });
  }

  async deleteContact(id: string): Promise<ApiResponse> {
    return this.request(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  async getLeads(): Promise<ApiResponse<Lead[]>> {
    return this.request<Lead[]>('/leads');
  }

  async createLead(leadData: Partial<Lead>): Promise<ApiResponse<Lead>> {
    return this.request<Lead>('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  }

  async updateLead(id: string, leadData: Partial<Lead>): Promise<ApiResponse<Lead>> {
    return this.request<Lead>(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(leadData),
    });
  }

  async deleteLead(id: string): Promise<ApiResponse> {
    return this.request(`/leads/${id}`, {
      method: 'DELETE',
    });
  }

  // AI Chat
  async getConversations(): Promise<ApiResponse<ChatConversation[]>> {
    return this.request<ChatConversation[]>('/chat/conversations');
  }

  async createConversation(title: string): Promise<ApiResponse<ChatConversation>> {
    return this.request<ChatConversation>('/chat/conversations', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
  }

  async deleteConversation(id: string): Promise<ApiResponse> {
    return this.request(`/chat/conversations/${id}`, {
      method: 'DELETE',
    });
  }

  async getMessages(conversationId: string): Promise<ApiResponse<ChatMessage[]>> {
    return this.request<ChatMessage[]>(`/chat/conversations/${conversationId}/messages`);
  }

  async sendMessage(conversationId: string, content: string): Promise<ApiResponse<ChatMessage>> {
    return this.request<ChatMessage>(`/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }
}

// Export singleton instance
export const apiService = new ApiService(); 
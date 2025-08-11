// Shared API Types

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  pagination?: PaginationMeta;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  token?: string;
  roles?: string[];
  permissions?: string[];
  profile?: Profile;
  tenant?: {
    id: number;
    name: string;
    domains: string[];
  };
}

export interface Profile {
  id: number;
  name: string;
  age: number | null;
  gender: string | null;
  phone_number: string | null;
  address: string | null;
  birth_date: string | null;
  user_id: number;
}

export interface TenantInfo {
  id: string;
  company: string | null;
  domains: string[];
}

export interface TenantOwner {
  id: number | null;
  name: string | null;
  email: string | null;
}

export interface TenantPlanRef {
  id: number | null;
  name: string | null;
  slug: string | null;
  price: number | null;
}

export interface Tenant {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  logo: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  owner: TenantOwner;
  plan: TenantPlanRef;
  users_count: number;
  modules_count: number;
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
  guard_name: string;
  created_at: string;
  updated_at: string;
  module?: string | null;
  action?: string | null;
  roles_count?: number;
}

export interface RolePermissionRef {
  id: number;
  name: string;
  guard_name: string;
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  permissions?: RolePermissionRef[];
  permissions_count?: number;
}

export interface Plan {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  max_users: number | null;
  max_storage: number | null;
  features: unknown;
  is_active: boolean;
  formatted_price: string;
  is_free: boolean;
  tenants_count?: number;
  created_at: string;
  updated_at: string;
}

export interface UserTenantRef {
  id: number;
  name: string;
  domains: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  token?: string;
  roles?: string[];
  permissions?: string[];
  profile?: Profile;
  tenant?: UserTenantRef;
}

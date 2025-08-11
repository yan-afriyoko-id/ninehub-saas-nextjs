import { httpClient } from "./httpClient";
import { API_CONFIG } from "../config/api";

export interface SubdomainUrls {
  ai_chat: string;
  crm: string;
}

export interface SubdomainValidation {
  subdomain: string;
  is_valid: boolean;
}

export interface SubdomainInfo {
  id: number;
  domain: string;
  created_at: string;
}

export interface TenantSubdomains {
  tenant_id: number;
  tenant_name: string;
  domains: SubdomainInfo[];
}

export class SubdomainService {
  /**
   * Get subdomain URLs for current user's tenant
   */
  static async getSubdomainUrls(): Promise<SubdomainUrls> {
    const response = await httpClient.get<SubdomainUrls>(
      `${API_CONFIG.ENDPOINTS.SUBDOMAINS}/urls`
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to get subdomain URLs");
    }

    return response.data || { ai_chat: "", crm: "" };
  }

  /**
   * Validate subdomain name
   */
  static async validateSubdomain(
    subdomain: string
  ): Promise<SubdomainValidation> {
    const response = await httpClient.post<SubdomainValidation>(
      `${API_CONFIG.ENDPOINTS.SUBDOMAINS}/validate`,
      { subdomain }
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to validate subdomain");
    }

    return response.data || { subdomain, is_valid: false };
  }

  /**
   * Get all subdomains (admin only)
   */
  static async getAllSubdomains(): Promise<TenantSubdomains[]> {
    const response = await httpClient.get<TenantSubdomains[]>(
      `${API_CONFIG.ENDPOINTS.SUBDOMAINS}/all`
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to get all subdomains");
    }

    return response.data || [];
  }

  /**
   * Create subdomains for a specific tenant (admin only)
   */
  static async createSubdomains(
    tenantId: number
  ): Promise<Record<string, any>> {
    const response = await httpClient.post<Record<string, any>>(
      `${API_CONFIG.ENDPOINTS.SUBDOMAINS}/tenants/${tenantId}/create`,
      {}
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to create subdomains");
    }

    return response.data || {};
  }

  /**
   * Delete subdomains for a specific tenant (admin only)
   */
  static async deleteSubdomains(tenantId: number): Promise<void> {
    const response = await httpClient.delete(
      `${API_CONFIG.ENDPOINTS.SUBDOMAINS}/tenants/${tenantId}/delete`
    );

    if (!response.success) {
      throw new Error(response.message || "Failed to delete subdomains");
    }
  }

  /**
   * Generate subdomain URL with authentication parameters
   */
  static generateAuthenticatedUrl(
    baseUrl: string,
    token: string,
    email: string
  ): string {
    if (!token || !email) {
      return baseUrl;
    }

    const params = new URLSearchParams({
      token,
      email,
      source: "ninehub-main",
    });

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Extract authentication parameters from URL
   */
  static extractAuthParams(url: string): {
    token: string | null;
    email: string | null;
  } {
    try {
      const urlObj = new URL(url);
      return {
        token: urlObj.searchParams.get("token"),
        email: urlObj.searchParams.get("email"),
      };
    } catch {
      return { token: null, email: null };
    }
  }
}

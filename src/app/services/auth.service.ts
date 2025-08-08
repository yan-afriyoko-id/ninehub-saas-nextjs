import type { ApiResponse, LoginRequest, LoginResponse, User } from "./types";
import { httpClient } from "./httpClient";

export interface AuthService {
  login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>>;
  logout(): Promise<ApiResponse>;
  getProfile(): Promise<ApiResponse<User>>;
  getMyProfile(): Promise<ApiResponse<User>>;
}

export class HttpAuthService implements AuthService {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await httpClient.request<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (response.success && response.data?.token) {
      httpClient.setToken(response.data.token);
    }
    return response;
  }

  async logout(): Promise<ApiResponse> {
    const response = await httpClient.request("/logout", { method: "POST" });
    if (response.success) {
      httpClient.setToken(null);
    }
    return response;
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return httpClient.request<User>("/profiles/me");
  }

  async getMyProfile(): Promise<ApiResponse<User>> {
    return httpClient.request<User>("/profiles/me");
  }
}

export const authService: AuthService = new HttpAuthService();

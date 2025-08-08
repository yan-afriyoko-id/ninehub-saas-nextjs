import type { ApiResponse, LoginRequest, LoginResponse, User } from "../types";

export interface AuthService {
  login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>>;
  logout(): Promise<ApiResponse>;
  me(): Promise<ApiResponse<User>>;
  refreshToken(): Promise<ApiResponse<{ token: string }>>;
  forgotPassword(email: string): Promise<ApiResponse>;
  resetPassword(token: string, password: string): Promise<ApiResponse>;
}

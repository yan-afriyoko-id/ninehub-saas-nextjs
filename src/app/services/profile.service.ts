import type { ApiResponse, User } from "./types";
import { httpClient } from "./httpClient";

export interface ProfileService {
  updateMyProfile(
    profileData: Record<string, unknown>
  ): Promise<ApiResponse<User>>;
  updateProfileById(
    profileId: string,
    profileData: Record<string, unknown>
  ): Promise<ApiResponse<User>>;
}

export class HttpProfileService implements ProfileService {
  async updateMyProfile(
    profileData: Record<string, unknown>
  ): Promise<ApiResponse<User>> {
    // Sesuai backend: GET /profiles/me -> ambil id -> PUT /profiles/{id}
    const me = await httpClient.request<User>("/profiles/me");
    if (!me.success || !me.data?.id) {
      return {
        success: false,
        message: me.message || "Failed to fetch profile id",
        errors: {},
      };
    }
    const id = me.data.id as unknown as string;
    return httpClient.request<User>(`/profiles/${id}`, {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  updateProfileById(
    profileId: string,
    profileData: Record<string, unknown>
  ): Promise<ApiResponse<User>> {
    return httpClient.request<User>(`/profiles/${profileId}`, {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }
}

export const profileService: ProfileService = new HttpProfileService();

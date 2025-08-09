import type { ApiResponse, User, Profile } from "./types";
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
    const me = await httpClient.request<User>("/me");

    let profileId: string | null = null;
    if (me.success && me.data && (me.data as User).profile?.id) {
      profileId = String((me.data as User).profile!.id);
    }

    if (!profileId) {
      const myProfile = await httpClient.request<Profile>("/profile");
      if (myProfile.success && myProfile.data?.id) {
        profileId = String(myProfile.data.id);
      }
    }

    if (!profileId) {
      return {
        success: false,
        message: me.message || "Failed to resolve profile id",
        errors: {},
      };
    }

    return httpClient.request<User>(`/profiles/${profileId}`, {
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

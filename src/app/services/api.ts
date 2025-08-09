import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  TenantInfo,
  Tenant,
  Module,
  Permission,
  Role,
  Plan,
  User,
} from "./types";
import { httpClient } from "./httpClient";
import { authService } from "./auth.service";
import { adminService } from "./admin.service";
import {
  modulesService,
  permissionsService,
  rolesService,
} from "./rbac.service";
import { plansService } from "./plans.service";
import { chatService } from "./chat.service";
import { profileService } from "./profile.service";

class ApiFacade {
  // Auth
  login = authService.login.bind(authService);
  logout = authService.logout.bind(authService);
  me = authService.me.bind(authService);

  // Profile
  async updateProfile(
    profileData: Record<string, unknown>
  ): Promise<ApiResponse<User>> {
    return httpClient.request<User>("/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }
  updateMyProfile = profileService.updateMyProfile.bind(profileService);
  updateProfileById = profileService.updateProfileById.bind(profileService);

  // Admin
  getTenants = adminService.getTenants.bind(adminService);
  createTenant = adminService.createTenant.bind(adminService);
  updateTenant = adminService.updateTenant.bind(adminService);
  deleteTenant = adminService.deleteTenant.bind(adminService);
  activateTenant = adminService.activateTenant.bind(adminService);
  suspendTenant = adminService.suspendTenant.bind(adminService);

  // Modules
  getModules = modulesService.getModules.bind(modulesService);
  createModule = modulesService.createModule.bind(modulesService);
  updateModule = modulesService.updateModule.bind(modulesService);
  deleteModule = modulesService.deleteModule.bind(modulesService);

  // Permissions
  getPermissions = permissionsService.getPermissions.bind(permissionsService);
  createPermission =
    permissionsService.createPermission.bind(permissionsService);
  updatePermission =
    permissionsService.updatePermission.bind(permissionsService);
  deletePermission =
    permissionsService.deletePermission.bind(permissionsService);

  // Roles
  getRoles = rolesService.getRoles.bind(rolesService);
  createRole = rolesService.createRole.bind(rolesService);
  updateRole = rolesService.updateRole.bind(rolesService);
  deleteRole = rolesService.deleteRole.bind(rolesService);

  // Plans
  getPlans = plansService.getPlans.bind(plansService);
  createPlan = plansService.createPlan.bind(plansService);
  updatePlan = plansService.updatePlan.bind(plansService);
  deletePlan = plansService.deletePlan.bind(plansService);

  // Chat
  sendChatMessage = chatService.sendChatMessage.bind(chatService);
  getChatHistory = chatService.getChatHistory.bind(chatService);
  clearChatHistory = chatService.clearChatHistory.bind(chatService);
  getConversation = chatService.getConversation.bind(chatService);
  deleteConversation = chatService.deleteConversation.bind(chatService);

  // Utils
  isAuthenticated(): boolean {
    return httpClient.isAuthenticated();
  }
  getToken(): string | null {
    return httpClient.getToken();
  }
}

export const apiClient = new ApiFacade();

export type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  TenantInfo,
  Tenant,
  Module,
  Permission,
  Role,
  Plan,
  User,
};

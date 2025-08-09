"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient } from "../services/api";
import type { User } from "../services/types";

export type UserRole = "admin" | "tenant";

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const transformUserData = (apiUser: Record<string, unknown>): User => {
  if (!apiUser) {
    throw new Error("User data is undefined or null");
  }

  const userData = (apiUser.user as Record<string, unknown>) || apiUser;

  let roles = (userData.roles as string[]) || [];
  if (!Array.isArray(roles)) {
    roles = [roles as string].filter(Boolean);
  }

  if (roles.length === 0) {
    if (
      (userData.is_admin as boolean) ||
      (userData.role as string) === "admin" ||
      (userData.role as string) === "super-admin"
    ) {
      roles = ["admin"];
    } else {
      roles = ["user"];
    }
  }

  let permissions = (userData.permissions as string[]) || [];
  if (!Array.isArray(permissions)) {
    permissions = [permissions as string].filter(Boolean);
  }

  if (roles.includes("admin") || roles.includes("super-admin")) {
    const adminPermissions = [
      "dashboard.view",
      "admin.dashboard.view",
      "tenant-management.view",
      "modules.view",
      "permissions.view",
      "roles.view",
      "plans.view",
      "crm.view",
      "chat.send",
      "settings.view",
      "profile.view",
      "company-settings.view",
      "security.view",
      "logs.view",
      "backup.view",
      "system-settings.view",
    ];

    adminPermissions.forEach((permission) => {
      if (!permissions.includes(permission)) {
        permissions.push(permission);
      }
    });
  }

  return {
    id: Number(userData.id) || 1,
    email: (userData.email as string) || "",
    name: (userData.name as string) || "",
    roles,
    permissions,
  };
};

// Helper function to transform profile data (without token)
const transformProfileData = (profileData: Record<string, unknown>): User => {
  // Add null check to prevent errors
  if (!profileData) {
    throw new Error("Profile data is undefined or null");
  }

  // Ensure roles array exists and contains at least one role
  let roles = (profileData.roles as string[]) || [];
  if (!Array.isArray(roles)) {
    roles = [roles as string].filter(Boolean);
  }

  // If no roles provided, check if user has admin-like properties
  if (roles.length === 0) {
    if (
      (profileData.is_admin as boolean) ||
      (profileData.role as string) === "admin" ||
      (profileData.role as string) === "super-admin"
    ) {
      roles = ["admin"];
    } else {
      roles = ["user"];
    }
  }

  // Ensure permissions array exists
  let permissions = (profileData.permissions as string[]) || [];
  if (!Array.isArray(permissions)) {
    permissions = [permissions as string].filter(Boolean);
  }

  // Add default permissions based on roles
  if (roles.includes("admin") || roles.includes("super-admin")) {
    const adminPermissions = [
      "dashboard.view",
      "admin.dashboard.view",
      "tenant-management.view",
      "modules.view",
      "permissions.view",
      "roles.view",
      "plans.view",
      "crm.view",
      "chat.send",
      "settings.view",
      "profile.view",
      "company-settings.view",
      "security.view",
      "logs.view",
      "backup.view",
      "system-settings.view",
    ];

    // Add admin permissions if not already present
    adminPermissions.forEach((permission) => {
      if (!permissions.includes(permission)) {
        permissions.push(permission);
      }
    });
  }

  return {
    id: Number(profileData.id) || 1,
    email: (profileData.email as string) || "",
    name: (profileData.name as string) || "",
    roles,
    permissions,
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (apiClient.isAuthenticated()) {
          const meResponse = await apiClient.me();

          if (meResponse.success && meResponse.data) {
            const userData = meResponse.data as unknown as Record<
              string,
              unknown
            >;
            const transformedUser = transformUserData(userData);
            setUser(transformedUser);
          } else {
            await apiClient.logout();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        await apiClient.logout();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await apiClient.login({ email, password });
      if (response.success && response.data) {
        try {
          const userData = response.data;
          const transformedUser = transformUserData(
            userData as unknown as Record<string, unknown>
          );
          setUser(transformedUser);

          if (typeof window !== "undefined") {
            localStorage.setItem("user_data", JSON.stringify(transformedUser));
          }

          setIsLoading(false);
          return {
            success: true,
            message: response.message || "Login successful!",
          };
        } catch (transformError) {
          console.error("Error transforming user data:", transformError);
          setIsLoading(false);
          return {
            success: false,
            message: "Invalid user data received from server",
          };
        }
      } else {
        setIsLoading(false);
        return {
          success: false,
          message: response.message || "Invalid email or password",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return {
        success: false,
        message: "Network error occurred. Please check your connection.",
      };
    }
  };

  const logout = async () => {
    try {
      const response = await apiClient.logout();

      if (!response.success) {
        console.warn("Logout warning:", response.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUser(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("user_data");
    }

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  apiClient,
  type LoginResponse,
  type ProfileResponse,
} from "../services/api";

export type UserRole = "admin" | "tenant";

interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
  avatar?: string;
  company_id?: string;
  tenant?: Record<string, unknown>;
  profile?: Record<string, unknown>;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

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

// Helper function to transform API user data to frontend format
const transformUserData = (apiUser: Record<string, unknown>): User => {
  // Add null check to prevent errors
  if (!apiUser) {
    throw new Error('User data is undefined or null');
  }

  // Handle different possible response structures
  const userData = (apiUser.user as Record<string, unknown>) || apiUser;
  
  // Ensure roles array exists and contains at least one role
  let roles = (userData.roles as string[]) || [];
  if (!Array.isArray(roles)) {
    roles = [roles as string].filter(Boolean);
  }
  
  // If no roles provided, check if user has admin-like properties
  if (roles.length === 0) {
    if ((userData.is_admin as boolean) || (userData.role as string) === 'admin' || (userData.role as string) === 'super-admin') {
      roles = ['admin'];
    } else {
      roles = ['user'];
    }
  }
  
  // Ensure permissions array exists
  let permissions = (userData.permissions as string[]) || [];
  if (!Array.isArray(permissions)) {
    permissions = [permissions as string].filter(Boolean);
  }
  
  // Add default permissions based on roles
  if (roles.includes('admin') || roles.includes('super-admin')) {
    const adminPermissions = [
      'dashboard.view',
      'admin.dashboard.view',
      'tenant-management.view',
      'modules.view',
      'permissions.view',
      'roles.view',
      'plans.view',
      'crm.view',
      'chat.send',
      'settings.view',
      'profile.view',
      'company-settings.view',
      'security.view',
      'logs.view',
      'backup.view',
      'system-settings.view'
    ];
    
    // Add admin permissions if not already present
    adminPermissions.forEach(permission => {
      if (!permissions.includes(permission)) {
        permissions.push(permission);
      }
    });
  }
  
  console.log('🔧 Transformed User Data:', {
    id: userData.id?.toString() || '1',
    email: userData.email || '',
    name: userData.name || '',
    roles,
    permissions
  });
  
  return {
    id: (userData.id as string)?.toString() || '1',
    email: (userData.email as string) || '',
    name: (userData.name as string) || '',
    roles,
    permissions,
    avatar: (userData.avatar as string) || `https://ui-avatars.com/api/?name=${encodeURIComponent((userData.name as string) || 'User')}&background=0D9488&color=fff`,
    company_id: (userData.company_id as string)?.toString() || '1',
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
    if ((profileData.is_admin as boolean) || (profileData.role as string) === 'admin' || (profileData.role as string) === 'super-admin') {
      roles = ['admin'];
    } else {
      roles = ['user'];
    }
  }
  
  // Ensure permissions array exists
  let permissions = (profileData.permissions as string[]) || [];
  if (!Array.isArray(permissions)) {
    permissions = [permissions as string].filter(Boolean);
  }
  
  // Add default permissions based on roles
  if (roles.includes('admin') || roles.includes('super-admin')) {
    const adminPermissions = [
      'dashboard.view',
      'admin.dashboard.view',
      'tenant-management.view',
      'modules.view',
      'permissions.view',
      'roles.view',
      'plans.view',
      'crm.view',
      'chat.send',
      'settings.view',
      'profile.view',
      'company-settings.view',
      'security.view',
      'logs.view',
      'backup.view',
      'system-settings.view'
    ];
    
    // Add admin permissions if not already present
    adminPermissions.forEach(permission => {
      if (!permissions.includes(permission)) {
        permissions.push(permission);
      }
    });
  }
  
  console.log('🔧 Transformed Profile Data:', {
    id: profileData.id?.toString() || '1',
    email: profileData.email,
    name: profileData.name,
    roles,
    permissions
  });

  return {
    id: (profileData.id as string)?.toString() || '1',
    email: (profileData.email as string) || '',
    name: (profileData.name as string) || '',
    roles,
    permissions,
    avatar: (profileData.avatar as string) || `https://ui-avatars.com/api/?name=${encodeURIComponent((profileData.name as string) || 'User')}&background=0D9488&color=fff`,
    company_id: (profileData.company_id as string)?.toString() || '1',
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and validate token with backend
    const checkAuthStatus = async () => {
      try {
        if (apiClient.isAuthenticated()) {
          // Validate token by calling profile endpoint
          const profileResponse = await apiClient.getProfile();

          if (profileResponse.success && profileResponse.data) {
            // Transform the user data from profile response
            const transformedUser = transformProfileData(profileResponse.data as unknown as Record<string, unknown>);
            setUser(transformedUser);
            console.log("Token validated successfully, user authenticated");
          } else {
            // Token is invalid or expired
            console.warn("Token validation failed:", profileResponse.message);
            await apiClient.logout();
            setUser(null);
          }
        } else {
          // No token found
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear invalid token
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
          // Handle different possible response structures
          const userData = response.data;
          const transformedUser = transformUserData(userData as unknown as Record<string, unknown>);
          setUser(transformedUser);
          
          // Store user data in localStorage for menu access
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
    console.log("Logout called"); // Debug log

    try {
      // Send logout request to backend with bearer token
      const response = await apiClient.logout();

      if (response.success) {
        console.log("Logout successful:", response.message);
      } else {
        console.warn("Logout warning:", response.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
          
    // Clear user state
    setUser(null);
    
    // Clear user data from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_data");
    }

    console.log("User state cleared, redirecting..."); // Debug log

    // Redirect to login page
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

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
const transformUserData = (apiUser: any): User => {
  // Add null check to prevent errors

  if (!laravelUser) {
    throw new Error("User data is undefined or null");
  }

  if (!apiUser) {
    throw new Error('User data is undefined or null');
  }

  // Handle different possible response structures
  const userData = apiUser.user || apiUser;
  
  return {
    id: userData.id?.toString() || '1',
    email: userData.email || '',
    name: userData.name || '',
    roles: userData.roles || ['user'],
    permissions: userData.permissions || [],
    avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=0D9488&color=fff`,
    company_id: userData.company_id?.toString() || '1',
  };
};

// Helper function to transform profile data (without token)
const transformProfileData = (profileData: ProfileResponse): User => {
  // Add null check to prevent errors
  if (!profileData) {
    throw new Error("Profile data is undefined or null");
  }

  return {
    id: profileData.id,
    email: profileData.email,
    name: profileData.name,
    roles: profileData.roles || [],
    permissions: profileData.permissions || [],
    tenant: profileData.tenant,
    profile: profileData.profile,
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
            const transformedUser = transformProfileData(profileResponse.data);
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
          const userData = response.data.user || response.data;
          const transformedUser = transformUserData(userData);
          setUser(transformedUser);
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

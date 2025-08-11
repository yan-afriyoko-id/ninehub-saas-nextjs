export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api",
  ENDPOINTS: {
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",
    ME: "/me",
    PROFILE: "/profile",
    MODULES: "/modules",
    PERMISSIONS: "/permissions",
    ROLES: "/roles",
    PLANS: "/plans",
    SUBDOMAINS: "/subdomains",
  },
};

export const getApiUrl = (endpoint: string): string =>
  `${API_CONFIG.BASE_URL}${endpoint}`;

// Environment-specific URLs for subdomain apps
export const APP_URLS = {
  AI_CHAT: process.env.NEXT_PUBLIC_AI_CHAT_URL || "http://localhost:3001",
  CRM: process.env.NEXT_PUBLIC_CRM_URL || "http://localhost:3002",
  BASE_DOMAIN: process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost:3000",
};

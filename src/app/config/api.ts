export const API_CONFIG = {
  BASE_URL: "http://api.ninehub.test/api",
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
  },
};

export const getApiUrl = (endpoint: string): string =>
  `${API_CONFIG.BASE_URL}${endpoint}`;

// API Configuration
// Ganti BASE_URL sesuai dengan backend Laravel Anda
export const API_CONFIG = {
  BASE_URL: "http://localhost:8000/api",

  // Endpoints
  ENDPOINTS: {
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",
    PROFILE: "/profiles/me",
    MODULES: "/modules",
    PERMISSIONS: "/permissions",
    ROLES: "/roles",
    PLANS: "/plans",
  },
};

// Helper function untuk membuat full URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Contoh penggunaan:
// - getApiUrl('/login') -> http://192.168.137.130:8000/api/login
// - getApiUrl('/register') -> http://192.168.137.130:8000/api/register
// - getApiUrl('/profiles/me') -> http://192.168.137.130:8000/api/profiles/me

// Atau bisa juga pakai ENDPOINTS:
// - getApiUrl(ENDPOINTS.LOGIN) -> http://192.168.137.130:8000/api/login
// - getApiUrl(ENDPOINTS.REGISTER) -> http://192.168.137.130:8000/api/register

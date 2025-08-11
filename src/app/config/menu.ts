import { APP_URLS } from "./api";

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string | (() => string);
  permission?: string;
  roles?: string[];
  children?: MenuItem[];
  badge?: string;
  isAdmin?: boolean;
  external?: boolean;
}

const getCurrentUserData = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");
    let email = "";

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        email = parsedUserData.email || "";
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    return { token, email };
  }
  return { token: null, email: "" };
};

const generateAiChatUrl = (): string => {
  const { token, email } = getCurrentUserData();

  if (!token || !email) {
    return APP_URLS.AI_CHAT;
  }

  return `${APP_URLS.AI_CHAT}?token=${token}&email=${encodeURIComponent(
    email
  )}`;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "layout-dashboard",
    path: "/dashboard",
    permission: "dashboard.view",
  },
  {
    id: "admin-dashboard",
    label: "Admin Dashboard",
    icon: "shield",
    path: "/admin/dashboard",
    permission: "admin.dashboard.view",
    roles: ["admin", "super-admin"],
    isAdmin: true,
  },
  {
    id: "tenant-management",
    label: "Tenants",
    icon: "building",
    path: "/admin/tenants",
    permission: "tenant-management.view",
    roles: ["admin", "super-admin"],
    isAdmin: true,
  },
  {
    id: "modules",
    label: "CRUD Modules",
    icon: "database",
    path: "/admin/modules",
    permission: "modules.view",
    roles: ["admin", "super-admin"],
    isAdmin: true,
  },
  {
    id: "permissions",
    label: "CRUD Permission",
    icon: "key",
    path: "/admin/permissions",
    permission: "permissions.view",
    roles: ["admin", "super-admin"],
    isAdmin: true,
  },
  {
    id: "roles",
    label: "CRUD Roles",
    icon: "shield-check",
    path: "/admin/roles",
    permission: "roles.view",
    roles: ["admin", "super-admin"],
    isAdmin: true,
  },
  {
    id: "plans",
    label: "CRUD Plans",
    icon: "credit-card",
    path: "/admin/plans",
    permission: "plans.view",
    roles: ["admin", "super-admin"],
    isAdmin: true,
  },
  {
    id: "crm",
    label: "Go to CRM",
    icon: "briefcase",
    path: APP_URLS.CRM,
    permission: "crm.view",
    external: true,
  },
  {
    id: "ai-chat-admin",
    label: "AI Chat",
    icon: "message-circle",
    path: "/ai-chat",
    permission: "chat.send",
    roles: ["admin", "super-admin"],
    isAdmin: true,
  },
  {
    id: "ai-chat-user",
    label: "AI Chat",
    icon: "message-circle",
    path: generateAiChatUrl,
    permission: "chat.send",
    external: true,
    roles: ["tenant", "user"],
  },
  {
    id: "subdomains",
    label: "Subdomain Apps",
    icon: "globe",
    path: "/subdomains",
    permission: "dashboard.view",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    path: "/settings",
    permission: "settings.view",
    children: [
      {
        id: "profile",
        label: "Profile",
        icon: "user",
        path: "/profile",
        permission: "profile.view",
      },
      {
        id: "company-settings",
        label: "Company Settings",
        icon: "building",
        path: "/company-settings",
        permission: "company-settings.view",
        roles: ["admin", "super-admin"],
      },
      {
        id: "security",
        label: "Security",
        icon: "lock",
        path: "/security",
        permission: "security.view",
      },
    ],
  },
  {
    id: "system-logs",
    label: "System Logs",
    icon: "file-text",
    path: "/admin/logs",
    permission: "logs.view",
    roles: ["admin", "super-admin"],
    isAdmin: true,
  },
  {
    id: "backup-restore",
    label: "Backup & Restore",
    icon: "database",
    path: "/admin/backup",
    permission: "backup.view",
    roles: ["admin", "super-admin"],
    isAdmin: true,
  },
  {
    id: "system-settings",
    label: "System Settings",
    icon: "settings",
    path: "/admin/settings",
    permission: "system-settings.view",
    roles: ["admin", "super-admin"],
    isAdmin: true,
  },
];

export const getMenuItemPath = (item: MenuItem): string => {
  if (typeof item.path === "function") {
    return item.path();
  }
  return item.path;
};

export const getFilteredMenuItems = (
  userRoles: string[],
  userPermissions: string[]
): MenuItem[] => {
  let effectivePermissions = [...userPermissions];
  const effectiveRoles = [...userRoles];

  if (
    (userRoles.includes("admin") || userRoles.includes("super-admin")) &&
    userPermissions.length === 0
  ) {
    const defaultAdminPermissions = [
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
    effectivePermissions = defaultAdminPermissions;
  }

  if (userPermissions.length === 0) {
    const defaultUserPermissions = [
      "dashboard.view",
      "crm.view",
      "chat.send",
      "settings.view",
      "profile.view",
      "security.view",
    ];
    effectivePermissions = defaultUserPermissions;
  }

  return MENU_ITEMS.filter((item) => {
    if (item.permission && !effectivePermissions.includes(item.permission)) {
      return false;
    }

    if (
      item.roles &&
      !item.roles.some((role) => effectiveRoles.includes(role))
    ) {
      return false;
    }

    if (item.children) {
      item.children = item.children.filter((child) => {
        if (
          child.permission &&
          !effectivePermissions.includes(child.permission)
        ) {
          return false;
        }
        if (
          child.roles &&
          !child.roles.some((role) => effectiveRoles.includes(role))
        ) {
          return false;
        }
        return true;
      });
    }

    return true;
  });
};

export const hasPermission = (
  userPermissions: string[],
  permission: string
): boolean => {
  return userPermissions.includes(permission);
};

export const hasRole = (userRoles: string[], role: string): boolean => {
  return userRoles.includes(role);
};

export const isAdmin = (userRoles: string[]): boolean => {
  return userRoles.some((role) => ["admin", "super-admin"].includes(role));
};

export const getAdminMenuItems = (
  userRoles: string[],
  userPermissions: string[]
): MenuItem[] => {
  let effectivePermissions = [...userPermissions];
  const effectiveRoles = [...userRoles];

  if (
    (userRoles.includes("admin") || userRoles.includes("super-admin")) &&
    userPermissions.length === 0
  ) {
    const defaultAdminPermissions = [
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
    effectivePermissions = defaultAdminPermissions;
  }

  return MENU_ITEMS.filter((item) => {
    if (!item.isAdmin) return false;

    if (item.permission && !effectivePermissions.includes(item.permission)) {
      return false;
    }

    if (
      item.roles &&
      !item.roles.some((role) => effectiveRoles.includes(role))
    ) {
      return false;
    }

    if (item.children) {
      item.children = item.children.filter((child) => {
        if (
          child.permission &&
          !effectivePermissions.includes(child.permission)
        ) {
          return false;
        }
        if (
          child.roles &&
          !child.roles.some((role) => effectiveRoles.includes(role))
        ) {
          return false;
        }
        return true;
      });
    }

    return true;
  });
};

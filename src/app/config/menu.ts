// Menu Configuration based on Roles and Permissions
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  permission?: string;
  roles?: string[];
  children?: MenuItem[];
  badge?: string;
  isAdmin?: boolean;
  external?: boolean;
}

// Menu items configuration
export const MENU_ITEMS: MenuItem[] = [
  // Dashboard - Available for all users
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'layout-dashboard',
    path: '/dashboard',
    permission: 'dashboard.view',
  },
  
  // Admin Only Menus
  {
    id: 'admin-dashboard',
    label: 'Admin Dashboard',
    icon: 'shield',
    path: '/admin/dashboard',
    permission: 'admin.dashboard.view',
    roles: ['admin', 'super-admin'],
    isAdmin: true,
  },
  {
    id: 'tenant-management',
    label: 'Menu Tenants',
    icon: 'building',
    path: '/admin/tenants',
    permission: 'tenant-management.view',
    roles: ['admin', 'super-admin'],
    isAdmin: true,
  },
  {
    id: 'modules',
    label: 'CRUD Modules',
    icon: 'database',
    path: '/admin/modules',
    permission: 'modules.view',
    roles: ['admin', 'super-admin'],
    isAdmin: true,
  },
  {
    id: 'permissions',
    label: 'CRUD Permission',
    icon: 'key',
    path: '/admin/permissions',
    permission: 'permissions.view',
    roles: ['admin', 'super-admin'],
    isAdmin: true,
  },
  {
    id: 'roles',
    label: 'CRUD Roles',
    icon: 'shield-check',
    path: '/admin/roles',
    permission: 'roles.view',
    roles: ['admin', 'super-admin'],
    isAdmin: true,
  },
  {
    id: 'plans',
    label: 'CRUD Plans',
    icon: 'credit-card',
    path: '/admin/plans',
    permission: 'plans.view',
    roles: ['admin', 'super-admin'],
    isAdmin: true,
  },
  
  // CRM Menus - Available for all users
  {
    id: 'crm',
    label: 'Menu ke CRM',
    icon: 'briefcase',
    path: 'https://your-crm-url.com', // Ganti dengan URL CRM Anda
    permission: 'crm.view',
    external: true,
  },
  
  // AI Chat - Admin version (internal)
  {
    id: 'ai-chat-admin',
    label: 'Menu ke AI Chat',
    icon: 'message-circle',
    path: '/ai-chat',
    permission: 'chat.send',
    roles: ['admin', 'super-admin'],
    isAdmin: true,
  },
  
  // AI Chat - User/Tenant version (external)
  {
    id: 'ai-chat-user',
    label: 'Menu ke AI Chat',
    icon: 'message-circle',
    path: 'http://localhost:3001/', // Ganti dengan URL AI Chat Anda
    permission: 'chat.send',
    external: true,
    roles: ['tenant', 'user'], // Hanya untuk user/tenant, bukan admin
  },
  
  // Settings - Available for admin and tenant  
  {
    id: 'settings',
    label: 'Menu Settings',
    icon: 'settings',
    path: '/settings',
    permission: 'settings.view',
    children: [
      {
        id: 'profile',
        label: 'Profile',
        icon: 'user',
        path: '/profile',
        permission: 'profile.view',
      },
      {
        id: 'company-settings',
        label: 'Company Settings',
        icon: 'building',
        path: '/company-settings',
        permission: 'company-settings.view',
        roles: ['admin', 'super-admin'], // Hanya admin yang bisa akses
      },
      {
        id: 'security',
        label: 'Security',
        icon: 'lock',
        path: '/security',
        permission: 'security.view',
      }
    ]
  },
  
  // User Management - Admin Only (DISABLED FOR NOW)
  // {
  //   id: 'user-management',
  //   label: 'User Management',
  //   icon: 'users',
  //   path: '/admin/users',
  //   permission: 'user-management.view',
  //   roles: ['admin', 'super-admin'],
  //   isAdmin: true,
  // },
  
  // Additional Admin Menus
  {
    id: 'system-logs',
    label: 'System Logs',
    icon: 'file-text',
    path: '/admin/logs',
    permission: 'logs.view',
    roles: ['admin', 'super-admin'],
    isAdmin: true,
  },
  {
    id: 'backup-restore',
    label: 'Backup & Restore',
    icon: 'database',
    path: '/admin/backup',
    permission: 'backup.view',
    roles: ['admin', 'super-admin'],
    isAdmin: true,
  },
  {
    id: 'system-settings',
    label: 'System Settings',
    icon: 'settings',
    path: '/admin/settings',
    permission: 'system-settings.view',
    roles: ['admin', 'super-admin'],
    isAdmin: true,
  },
];

// Helper function to filter menu items based on user roles and permissions
export const getFilteredMenuItems = (userRoles: string[], userPermissions: string[]): MenuItem[] => {
  // Add fallback permissions for admin users if they don't have specific permissions
  let effectivePermissions = [...userPermissions];
  let effectiveRoles = [...userRoles];
  
  // If user has admin role but no permissions, add default admin permissions
  if ((userRoles.includes('admin') || userRoles.includes('super-admin')) && userPermissions.length === 0) {
    const defaultAdminPermissions = [
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
    effectivePermissions = defaultAdminPermissions;
  }
  
  // If user has no permissions, add default user permissions
  if (userPermissions.length === 0) {
    const defaultUserPermissions = [
      'dashboard.view',
      'crm.view',
      'chat.send',
      'settings.view',
      'profile.view',
      'security.view'
    ];
    effectivePermissions = defaultUserPermissions;
  }
  
  console.log('🔧 Menu Filtering:', {
    originalRoles: userRoles,
    originalPermissions: userPermissions,
    effectiveRoles,
    effectivePermissions
  });
  
  return MENU_ITEMS.filter(item => {
    // Check if user has required permission
    if (item.permission && !effectivePermissions.includes(item.permission)) {
      console.log(`❌ Menu item "${item.label}" filtered out - missing permission: ${item.permission}`);
      return false;
    }
    
    // Check if user has required role
    if (item.roles && !item.roles.some(role => effectiveRoles.includes(role))) {
      console.log(`❌ Menu item "${item.label}" filtered out - missing role: ${item.roles.join(', ')}`);
      return false;
    }
    
    // Filter children if they exist
    if (item.children) {
      item.children = item.children.filter(child => {
        if (child.permission && !effectivePermissions.includes(child.permission)) {
          console.log(`❌ Child menu item "${child.label}" filtered out - missing permission: ${child.permission}`);
          return false;
        }
        if (child.roles && !child.roles.some(role => effectiveRoles.includes(role))) {
          console.log(`❌ Child menu item "${child.label}" filtered out - missing role: ${child.roles.join(', ')}`);
          return false;
        }
        return true;
      });
    }
    
    console.log(`✅ Menu item "${item.label}" included`);
    return true;
  });
};

// Helper function to check if user has specific permission
export const hasPermission = (userPermissions: string[], permission: string): boolean => {
  return userPermissions.includes(permission);
};

// Helper function to check if user has specific role
export const hasRole = (userRoles: string[], role: string): boolean => {
  return userRoles.includes(role);
};

// Helper function to check if user is admin
export const isAdmin = (userRoles: string[]): boolean => {
  return userRoles.some(role => ['admin', 'super-admin'].includes(role));
};

// Helper function to get admin menu items
export const getAdminMenuItems = (userRoles: string[], userPermissions: string[]): MenuItem[] => {
  // Add fallback permissions for admin users if they don't have specific permissions
  let effectivePermissions = [...userPermissions];
  let effectiveRoles = [...userRoles];
  
  // If user has admin role but no permissions, add default admin permissions
  if ((userRoles.includes('admin') || userRoles.includes('super-admin')) && userPermissions.length === 0) {
    const defaultAdminPermissions = [
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
    effectivePermissions = defaultAdminPermissions;
  }
  
  console.log('🔧 Admin Menu Filtering:', {
    originalRoles: userRoles,
    originalPermissions: userPermissions,
    effectiveRoles,
    effectivePermissions
  });
  
  return MENU_ITEMS.filter(item => {
    if (!item.isAdmin) return false;
    
    // Check if user has required permission
    if (item.permission && !effectivePermissions.includes(item.permission)) {
      console.log(`❌ Admin menu item "${item.label}" filtered out - missing permission: ${item.permission}`);
      return false;
    }
    
    // Check if user has required role
    if (item.roles && !item.roles.some(role => effectiveRoles.includes(role))) {
      console.log(`❌ Admin menu item "${item.label}" filtered out - missing role: ${item.roles.join(', ')}`);
      return false;
    }
    
    // Filter children if they exist
    if (item.children) {
      item.children = item.children.filter(child => {
        if (child.permission && !effectivePermissions.includes(child.permission)) {
          console.log(`❌ Child admin menu item "${child.label}" filtered out - missing permission: ${child.permission}`);
          return false;
        }
        if (child.roles && !child.roles.some(role => effectiveRoles.includes(role))) {
          console.log(`❌ Child admin menu item "${child.label}" filtered out - missing role: ${child.roles.join(', ')}`);
          return false;
        }
        return true;
      });
    }
    
    console.log(`✅ Admin menu item "${item.label}" included`);
    return true;
  });
};

// Helper function to get user menu items (non-admin)
export const getUserMenuItems = (userRoles: string[], userPermissions: string[]): MenuItem[] => {
  // Add fallback permissions for users if they don't have specific permissions
  let effectivePermissions = [...userPermissions];
  let effectiveRoles = [...userRoles];
  
  // If user has no permissions, add default user permissions
  if (userPermissions.length === 0) {
    const defaultUserPermissions = [
      'dashboard.view',
      'crm.view',
      'chat.send',
      'settings.view',
      'profile.view',
      'security.view'
    ];
    effectivePermissions = defaultUserPermissions;
  }
  
  console.log('🔧 User Menu Filtering:', {
    originalRoles: userRoles,
    originalPermissions: userPermissions,
    effectiveRoles,
    effectivePermissions
  });
  
  return MENU_ITEMS.filter(item => {
    if (item.isAdmin) return false;
    
    // Check if user has required permission
    if (item.permission && !effectivePermissions.includes(item.permission)) {
      console.log(`❌ User menu item "${item.label}" filtered out - missing permission: ${item.permission}`);
      return false;
    }
    
    // Check if user has required role
    if (item.roles && !item.roles.some(role => effectiveRoles.includes(role))) {
      console.log(`❌ User menu item "${item.label}" filtered out - missing role: ${item.roles.join(', ')}`);
      return false;
    }
    
    // Filter children if they exist
    if (item.children) {
      item.children = item.children.filter(child => {
        if (child.permission && !effectivePermissions.includes(child.permission)) {
          console.log(`❌ Child user menu item "${child.label}" filtered out - missing permission: ${child.permission}`);
          return false;
        }
        if (child.roles && !child.roles.some(role => effectiveRoles.includes(role))) {
          console.log(`❌ Child user menu item "${child.label}" filtered out - missing role: ${child.roles.join(', ')}`);
          return false;
        }
        return true;
      });
    }
    
    console.log(`✅ User menu item "${item.label}" included`);
    return true;
  });
}; 
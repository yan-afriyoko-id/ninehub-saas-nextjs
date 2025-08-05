// Menu Configuration based on Roles and Permissions
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  permission?: string;
  roles?: string[];
  children?: MenuItem[];
}

// Menu items configuration
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    permission: 'dashboard.view',
  },
  {
    id: 'user-management',
    label: 'User Management',
    icon: 'users',
    path: '/admin/users',
    permission: 'user-management.view',
    roles: ['admin', 'super-admin'],
  },
  {
    id: 'tenant-management',
    label: 'Tenant Management',
    icon: 'building',
    path: '/admin/tenants',
    permission: 'tenant-management.view',
    roles: ['admin', 'super-admin'],
  },
  {
    id: 'plan-management',
    label: 'Plan Management',
    icon: 'credit-card',
    path: '/admin/plans',
    permission: 'plan-management.view',
    roles: ['admin', 'super-admin'],
  },
  {
    id: 'company',
    label: 'Company',
    icon: 'briefcase',
    path: '/company',
    permission: 'company.view',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: 'address-book',
    path: '/contacts',
    permission: 'contact.view',
  },
  {
    id: 'leads',
    label: 'Leads',
    icon: 'target',
    path: '/leads',
    permission: 'lead.view',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: 'user',
    path: '/profile',
    permission: 'profile.view',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    path: '/settings',
    permission: 'settings.view',
    roles: ['admin', 'super-admin'],
  },
  {
    id: 'ai-chat',
    label: 'AI Chat',
    icon: 'message-circle',
    path: '/ai-chat',
    permission: 'chat.send',
  },
];

// Helper function to filter menu items based on user roles and permissions
export const getFilteredMenuItems = (userRoles: string[], userPermissions: string[]): MenuItem[] => {
  return MENU_ITEMS.filter(item => {
    // Check if user has required permission
    if (item.permission && !userPermissions.includes(item.permission)) {
      return false;
    }
    
    // Check if user has required role
    if (item.roles && !item.roles.some(role => userRoles.includes(role))) {
      return false;
    }
    
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
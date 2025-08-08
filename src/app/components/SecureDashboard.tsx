"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import {
  getFilteredMenuItems,
  getUserMenuItems,
  isAdmin,
  getMenuItemPath,
  MenuItem,
} from "../config/menu";
import {
  BarChart3,
  Users,
  Settings,
  User,
  Bell,
  Search,
  LogOut,
  Home,
  MessageSquare,
  Database,
  Shield,
  UserCheck,
  CreditCard,
  LayoutDashboard,
  Building,
  Briefcase,
  BookOpen,
  Target,
  MessageCircle,
  Key,
  ShieldCheck,
  Lock,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
  "layout-dashboard": LayoutDashboard,
  shield: Shield,
  building: Building,
  database: Database,
  key: Key,
  "shield-check": ShieldCheck,
  "credit-card": CreditCard,
  briefcase: Briefcase,
  users: Users,
  target: Target,
  "message-circle": MessageCircle,
  settings: Settings,
  user: User,
  lock: Lock,
  "bar-chart-3": BarChart3,
  "message-square": MessageSquare,
  "user-check": UserCheck,
  "book-open": BookOpen,
};

interface SecureDashboardProps {
  children: React.ReactNode;
}

export default function SecureDashboard({ children }: SecureDashboardProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Check authentication
    if (!user) {
      router.push("/login");
      return;
    }

    // Debug: Log user data
    console.log("🔍 User Data:", {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      permissions: user.permissions,
    });

    setIsLoading(false);
  }, [user, router]);

  const toggleMenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isUserAdmin = isAdmin(user.roles);

  // Debug: Log admin check
  console.log("🔍 Admin Check:", {
    isUserAdmin,
    userRoles: user.roles,
    adminRoles: ["admin", "super-admin"],
  });

  // Get appropriate menu items based on user role
  let menuItems;
  if (isUserAdmin) {
    // Admin gets all admin menus + general menus
    menuItems = getFilteredMenuItems(user.roles, user.permissions);
    console.log("🔍 Admin Menu Items:", menuItems);
  } else {
    // Regular user gets only user menus (non-admin)
    menuItems = getUserMenuItems(user.roles, user.permissions);
    console.log("🔍 User Menu Items:", menuItems);
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const IconComponent = iconMap[item.icon];
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.has(item.id);
    const isActive = activeTab === item.id;
    const isExternal = item.external || false;

    const menuContent = (
      <div className="flex items-center space-x-3">
        {IconComponent && <IconComponent size={20} />}
        <span>{item.label}</span>
        {item.badge && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </div>
    );

    const menuButton = (
      <div className="flex items-center justify-between">
        {menuContent}
        {hasChildren &&
          (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
      </div>
    );

    return (
      <div key={item.id as string}>
        {isExternal ? (
          // External link - use anchor tag
          <a
            href={getMenuItemPath(item)}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              level > 0 ? "ml-4" : ""
            } ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab(item.id);
              if (hasChildren) {
                toggleMenu(item.id);
              }
            }}
          >
            {menuButton}
          </a>
        ) : (
          // Internal link - use Next.js Link
          <Link
            href={getMenuItemPath(item)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
              level > 0 ? "ml-4" : ""
            } ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveTab(item.id);
              if (hasChildren) {
                toggleMenu(item.id);
              }
            }}
          >
            {menuButton}
          </Link>
        )}

        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-1">
            {item.children!.map((child: MenuItem) =>
              renderMenuItem(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  isUserAdmin ? "bg-blue-600" : "bg-green-600"
                }`}
              >
                {isUserAdmin ? (
                  <Shield size={20} className="text-white" />
                ) : (
                  <Building size={20} className="text-white" />
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">NineHub</h1>
                <p className="text-xs text-gray-400 capitalize">
                  {isUserAdmin ? "Admin Dashboard" : "User Dashboard"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center space-x-3 mb-8">
            <div
              className={`p-2 rounded-lg ${
                isUserAdmin ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {isUserAdmin ? (
                <Shield size={20} className="text-white" />
              ) : (
                <Building size={20} className="text-white" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">NineHub</h1>
              <p className="text-xs text-gray-400 capitalize">
                {isUserAdmin ? "Admin Dashboard" : "User Dashboard"}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item: MenuItem) => renderMenuItem(item))}
          </nav>

          {/* Bottom section */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors mt-2"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white"
              >
                <Menu size={20} />
              </button>
              <h2 className="text-xl font-semibold text-white">
                {menuItems.find((item) => item.id === activeTab)?.label ||
                  "Dashboard"}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span>{user.name}</span>
                  <ChevronDown size={16} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                      <hr className="border-gray-700 my-2" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { hasPermission, hasRole, isAdmin } from '../config/menu';
import { AlertTriangle, Shield, Lock } from 'lucide-react';

interface SecureRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  adminOnly?: boolean;
  fallback?: React.ReactNode;
}

export default function SecureRoute({ 
  children, 
  requiredPermissions = [], 
  requiredRoles = [], 
  adminOnly = false,
  fallback 
}: SecureRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    // Check if user is admin when adminOnly is true
    if (adminOnly && !isAdmin(user.roles)) {
      setIsAuthorized(false);
      setIsChecking(false);
      return;
    }

    // Check required roles
    if (requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some(role => hasRole(user.roles, role));
      if (!hasRequiredRole) {
        setIsAuthorized(false);
        setIsChecking(false);
        return;
      }
    }

    // Check required permissions
    if (requiredPermissions.length > 0) {
      const hasRequiredPermission = requiredPermissions.some(permission => 
        hasPermission(user.permissions, permission)
      );
      if (!hasRequiredPermission) {
        setIsAuthorized(false);
        setIsChecking(false);
        return;
      }
    }

    setIsAuthorized(true);
    setIsChecking(false);
  }, [user, isLoading, requiredPermissions, requiredRoles, adminOnly, router]);

  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <Shield className="text-red-500" size={48} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
            <p className="text-gray-400 mb-4">
              You don't have permission to access this page.
            </p>
            {adminOnly && (
              <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-yellow-500" size={20} />
                  <span className="text-yellow-400 text-sm">Admin access required</span>
                </div>
              </div>
            )}
            {requiredRoles.length > 0 && (
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Lock className="text-blue-500" size={20} />
                  <span className="text-blue-400 text-sm">
                    Required roles: {requiredRoles.join(', ')}
                  </span>
                </div>
              </div>
            )}
            {requiredPermissions.length > 0 && (
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Lock className="text-purple-500" size={20} />
                  <span className="text-purple-400 text-sm">
                    Required permissions: {requiredPermissions.join(', ')}
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={() => router.back()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 
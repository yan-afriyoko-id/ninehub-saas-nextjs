'use client';

import { useAuth } from './AuthContext';
import { getFilteredMenuItems, getAdminMenuItems, getUserMenuItems, isAdmin } from '../config/menu';

export default function DebugUserInfo() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 mb-4">
        <h3 className="text-red-400 font-semibold mb-2">Debug: No User Data</h3>
        <p className="text-red-300 text-sm">User is not authenticated</p>
      </div>
    );
  }

  const isUserAdmin = isAdmin(user.roles);
  const adminMenuItems = getAdminMenuItems(user.roles, user.permissions);
  const userMenuItems = getUserMenuItems(user.roles, user.permissions);
  const allMenuItems = getFilteredMenuItems(user.roles, user.permissions);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
      <h3 className="text-white font-semibold mb-4">🔍 Debug: User Information</h3>
      
      {/* User Data */}
      <div className="mb-4">
        <h4 className="text-blue-400 font-medium mb-2">User Data:</h4>
        <div className="bg-gray-900 rounded p-3 text-sm">
          <p><span className="text-gray-400">ID:</span> <span className="text-white">{user.id}</span></p>
          <p><span className="text-gray-400">Name:</span> <span className="text-white">{user.name}</span></p>
          <p><span className="text-gray-400">Email:</span> <span className="text-white">{user.email}</span></p>
          <p><span className="text-gray-400">Roles:</span> <span className="text-white">{user.roles.join(', ')}</span></p>
          <p><span className="text-gray-400">Permissions:</span> <span className="text-white">{user.permissions.join(', ')}</span></p>
        </div>
      </div>

      {/* Admin Check */}
      <div className="mb-4">
        <h4 className="text-green-400 font-medium mb-2">Admin Check:</h4>
        <div className="bg-gray-900 rounded p-3 text-sm">
          <p><span className="text-gray-400">Is Admin:</span> <span className={isUserAdmin ? 'text-green-400' : 'text-red-400'}>{isUserAdmin ? 'Yes' : 'No'}</span></p>
          <p><span className="text-gray-400">Admin Roles:</span> <span className="text-white">['admin', 'super-admin']</span></p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mb-4">
        <h4 className="text-yellow-400 font-medium mb-2">Menu Items:</h4>
        <div className="bg-gray-900 rounded p-3 text-sm">
          <p><span className="text-gray-400">Total Menu Items:</span> <span className="text-white">{allMenuItems.length}</span></p>
          <p><span className="text-gray-400">Admin Menu Items:</span> <span className="text-white">{adminMenuItems.length}</span></p>
          <p><span className="text-gray-400">User Menu Items:</span> <span className="text-white">{userMenuItems.length}</span></p>
        </div>
      </div>

      {/* Available Menu Items */}
      <div>
        <h4 className="text-purple-400 font-medium mb-2">Available Menu Items:</h4>
        <div className="bg-gray-900 rounded p-3 text-sm">
          {allMenuItems.map((item) => (
            <div key={item.id} className="mb-2 p-2 bg-gray-800 rounded">
              <p><span className="text-gray-400">ID:</span> <span className="text-white">{item.id}</span></p>
              <p><span className="text-gray-400">Label:</span> <span className="text-white">{item.label}</span></p>
              <p><span className="text-gray-400">Path:</span> <span className="text-white">{item.path}</span></p>
              <p><span className="text-gray-400">Permission:</span> <span className="text-white">{item.permission || 'None'}</span></p>
              <p><span className="text-gray-400">Roles:</span> <span className="text-white">{item.roles?.join(', ') || 'Any'}</span></p>
              <p><span className="text-gray-400">Is Admin:</span> <span className={item.isAdmin ? 'text-green-400' : 'text-red-400'}>{item.isAdmin ? 'Yes' : 'No'}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
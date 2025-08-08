"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { apiClient } from "../services/api";
import DebugUserInfo from "../components/DebugUserInfo";
import {
  getFilteredMenuItems,
  getAdminMenuItems,
  getUserMenuItems,
  getMenuItemPath,
} from "../config/menu";

export default function TestUserPage() {
  const { user } = useAuth();
  const [rawApiData, setRawApiData] = useState<Record<string, unknown> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Get raw profile data from API
        const profileResponse = await apiClient.me();
        setRawApiData(profileResponse as unknown as Record<string, unknown>);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Test User Page</h1>
          <p className="text-gray-400">Please login first</p>
        </div>
      </div>
    );
  }

  const adminMenuItems = getAdminMenuItems(user.roles, user.permissions);
  const userMenuItems = getUserMenuItems(user.roles, user.permissions);
  const allMenuItems = getFilteredMenuItems(user.roles, user.permissions);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">
          🔍 User Data Test Page
        </h1>

        {isLoading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-white mt-4">Loading user data...</p>
          </div>
        )}

        {/* Debug Component */}
        <DebugUserInfo />

        {/* Raw API Data */}
        {rawApiData && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-4">
              📡 Raw API Response:
            </h3>
            <div className="bg-gray-900 rounded p-3 text-sm overflow-auto">
              <pre className="text-green-400">
                {JSON.stringify(rawApiData, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Menu Analysis */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-4">📋 Menu Analysis:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded p-3">
              <h4 className="text-blue-400 font-medium mb-2">
                Admin Menu Items ({adminMenuItems.length})
              </h4>
              <div className="space-y-1 text-sm">
                {adminMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="text-white p-2 bg-gray-800 rounded"
                  >
                    {item.label} - {getMenuItemPath(item)}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded p-3">
              <h4 className="text-green-400 font-medium mb-2">
                User Menu Items ({userMenuItems.length})
              </h4>
              <div className="space-y-1 text-sm">
                {userMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="text-white p-2 bg-gray-800 rounded"
                  >
                    {item.label} - {getMenuItemPath(item)}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded p-3">
              <h4 className="text-yellow-400 font-medium mb-2">
                All Menu Items ({allMenuItems.length})
              </h4>
              <div className="space-y-1 text-sm">
                {allMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="text-white p-2 bg-gray-800 rounded"
                  >
                    {item.label} - {getMenuItemPath(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting Guide */}
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
          <h3 className="text-blue-400 font-semibold mb-4">
            🔧 Troubleshooting Guide:
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-blue-300">
              <strong>If menu items are missing:</strong>
            </p>
            <ul className="list-disc list-inside text-blue-300 ml-4 space-y-1">
              <li>
                Check if user has role &apos;admin&apos; or
                &apos;super-admin&apos;
              </li>
              <li>Check if user has required permissions</li>
              <li>Check if backend is sending correct user data</li>
              <li>Check browser console for debug logs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

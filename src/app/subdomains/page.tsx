"use client";

import SecureRoute from "../components/SecureRoute";
import SecureDashboard from "../components/SecureDashboard";
import SubdomainNavigation from "../components/SubdomainNavigation";
import EnvironmentStatus from "../components/EnvironmentStatus";

export default function SubdomainsPage() {
  return (
    <SecureRoute>
      <SecureDashboard>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Subdomain Applications
              </h1>
              <p className="text-gray-400">
                Access and manage your specialized applications
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SubdomainNavigation />
            </div>
            <div className="lg:col-span-1">
              <EnvironmentStatus />
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
}

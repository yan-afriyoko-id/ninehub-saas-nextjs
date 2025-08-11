"use client";

import { APP_URLS } from "../config/api";
import { useAuth } from "./AuthContext";
import { MessageCircle, Briefcase, ExternalLink } from "lucide-react";

interface SubdomainApp {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  bgColor: string;
}

export default function SubdomainNavigation() {
  const { user } = useAuth();

  const subdomainApps: SubdomainApp[] = [
    {
      id: "ai-chat",
      name: "AI Chat",
      description: "Intelligent chatbot with advanced AI capabilities",
      url: APP_URLS.AI_CHAT,
      icon: MessageCircle,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      id: "crm",
      name: "CRM System",
      description: "Customer relationship management platform",
      url: APP_URLS.CRM,
      icon: Briefcase,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
  ];

  const generateAppUrl = (baseUrl: string, appId: string) => {
    if (!user?.token || !user?.email) {
      return baseUrl;
    }

    // Add authentication parameters for seamless login
    const params = new URLSearchParams({
      token: user.token,
      email: user.email,
      source: "ninehub-main",
    });

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subdomainApps.map((app) => {
          const IconComponent = app.icon;
          const appUrl = generateAppUrl(app.url, app.id);

          return (
            <div
              key={app.id}
              className={`${app.bgColor} border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${app.color} bg-gray-800`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {app.name}
                    </h3>
                    <p className="text-sm text-gray-400">{app.description}</p>
                  </div>
                </div>
                <ExternalLink size={20} className="text-gray-500" />
              </div>

              <div className="space-y-3">
                <div className="bg-gray-900 rounded p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">URL:</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono break-all mt-1">
                    {appUrl}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
                  >
                    Open {app.name}
                  </a>
                </div>
              </div>

              {user?.token && (
                <div className="mt-3 p-2 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-400">
                  ✓ Authentication token will be automatically passed
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <h4 className="text-blue-400 font-medium mb-2">ℹ️ How it works:</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>
            • Each application runs on its own subdomain for better isolation
          </li>
          <li>
            • Authentication tokens are automatically passed for seamless login
          </li>
          <li>• You can access these apps directly or through the main menu</li>
          <li>• All apps share the same backend API for data consistency</li>
        </ul>
      </div>
    </div>
  );
}

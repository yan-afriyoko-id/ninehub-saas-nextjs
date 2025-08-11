"use client";

import { API_CONFIG, APP_URLS } from "../config/api";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

export default function EnvironmentStatus() {
  const isLocalDevelopment = process.env.NODE_ENV === "development";

  const configStatus = [
    {
      name: "API Base URL",
      value: API_CONFIG.BASE_URL,
      status:
        API_CONFIG.BASE_URL.includes("localhost") ||
        API_CONFIG.BASE_URL.includes("ninehub.test")
          ? "local"
          : "production",
    },
    {
      name: "AI Chat URL",
      value: APP_URLS.AI_CHAT,
      status: APP_URLS.AI_CHAT.includes("localhost") ? "local" : "production",
    },
    {
      name: "CRM URL",
      value: APP_URLS.CRM,
      status: APP_URLS.CRM.includes("localhost") ? "local" : "production",
    },
    {
      name: "Base Domain",
      value: APP_URLS.BASE_DOMAIN,
      status: APP_URLS.BASE_DOMAIN.includes("localhost")
        ? "local"
        : "production",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "local":
        return <Info size={16} className="text-blue-400" />;
      case "production":
        return <CheckCircle size={16} className="text-green-400" />;
      default:
        return <AlertCircle size={16} className="text-yellow-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "local":
        return "Local Development";
      case "production":
        return "Production";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="text-lg font-semibold text-white">Environment Status</h3>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            isLocalDevelopment
              ? "bg-blue-500/20 text-blue-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {isLocalDevelopment ? "Development" : "Production"}
        </span>
      </div>

      <div className="space-y-3">
        {configStatus.map((config) => (
          <div
            key={config.name}
            className="flex items-center justify-between p-3 bg-gray-900 rounded"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(config.status)}
              <div>
                <p className="text-sm font-medium text-white">{config.name}</p>
                <p className="text-xs text-gray-400 font-mono">
                  {config.value}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                config.status === "local"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {getStatusText(config.status)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
        <div className="flex items-start space-x-2">
          <Info size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <p className="font-medium text-blue-400 mb-1">
              Configuration Notes:
            </p>
            <ul className="space-y-1 text-xs">
              <li>
                • Environment variables are loaded from{" "}
                <code className="bg-gray-800 px-1 rounded">.env.local</code>
              </li>
              <li>
                • Subdomain URLs are automatically generated with authentication
                tokens
              </li>
              <li>
                • All applications share the same backend API for data
                consistency
              </li>
              <li>
                • Local development uses{" "}
                <code className="bg-gray-800 px-1 rounded">localhost</code>{" "}
                ports
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

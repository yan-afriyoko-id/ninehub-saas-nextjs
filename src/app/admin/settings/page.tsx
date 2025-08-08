"use client";

import { useState, useEffect } from "react";
import SecureRoute from "../../components/SecureRoute";
import SecureDashboard from "../../components/SecureDashboard";
import { Settings, Save, Mail, Shield, Database, Bell } from "lucide-react";

interface SystemSettings {
  general: {
    site_name: string;
    site_description: string;
    timezone: string;
    language: string;
    maintenance_mode: boolean;
  };
  email: {
    smtp_host: string;
    smtp_port: number;
    smtp_username: string;
    smtp_password: string;
    from_email: string;
    from_name: string;
  };
  security: {
    session_timeout: number;
    max_login_attempts: number;
    password_min_length: number;
    require_2fa: boolean;
    allowed_file_types: string[];
    max_file_size: number;
  };
  database: {
    connection: string;
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  };
  notifications: {
    email_notifications: boolean;
    push_notifications: boolean;
    slack_webhook: string;
    telegram_bot_token: string;
  };
}

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummySettings: SystemSettings = {
        general: {
          site_name: "NineHub Platform",
          site_description: "Multi-tenant SaaS Platform",
          timezone: "Asia/Jakarta",
          language: "en",
          maintenance_mode: false,
        },
        email: {
          smtp_host: "smtp.gmail.com",
          smtp_port: 587,
          smtp_username: "noreply@ninehub.com",
          smtp_password: "********",
          from_email: "noreply@ninehub.com",
          from_name: "NineHub System",
        },
        security: {
          session_timeout: 120,
          max_login_attempts: 5,
          password_min_length: 8,
          require_2fa: true,
          allowed_file_types: ["jpg", "png", "pdf", "doc", "docx"],
          max_file_size: 10,
        },
        database: {
          connection: "mysql",
          host: "localhost",
          port: 3306,
          database: "ninehub",
          username: "root",
          password: "********",
        },
        notifications: {
          email_notifications: true,
          push_notifications: true,
          slack_webhook: "",
          telegram_bot_token: "",
        },
      };
      setSettings(dummySettings);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      alert("Settings saved successfully!");
      setIsSaving(false);
    }, 1000);
  };

  const handleInputChange = (
    section: keyof SystemSettings,
    field: string,
    value: string | number | boolean | string[]
  ) => {
    if (!settings) return;

    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    });
  };

  if (isLoading) {
    return (
      <SecureRoute adminOnly={true}>
        <SecureDashboard>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </SecureDashboard>
      </SecureRoute>
    );
  }

  if (!settings) {
    return (
      <SecureRoute adminOnly={true}>
        <SecureDashboard>
          <div className="text-center py-12">
            <Settings className="mx-auto text-gray-400" size={48} />
            <h3 className="text-lg font-semibold text-white mt-4">
              Settings not found
            </h3>
          </div>
        </SecureDashboard>
      </SecureRoute>
    );
  }

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "email", label: "Email", icon: Mail },
    { id: "security", label: "Security", icon: Shield },
    { id: "database", label: "Database", icon: Database },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <SecureRoute adminOnly={true}>
      <SecureDashboard>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">System Settings</h1>
              <p className="text-gray-400">
                Configure system-wide settings and preferences
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Save size={20} />
              <span>{isSaving ? "Saving..." : "Save Settings"}</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="border-b border-gray-700">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-500"
                          : "border-transparent text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* General Settings */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={settings.general.site_name}
                        onChange={(e) =>
                          handleInputChange(
                            "general",
                            "site_name",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Site Description
                      </label>
                      <input
                        type="text"
                        value={settings.general.site_description}
                        onChange={(e) =>
                          handleInputChange(
                            "general",
                            "site_description",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) =>
                          handleInputChange(
                            "general",
                            "timezone",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Asia/Jakarta">Asia/Jakarta</option>
                        <option value="Asia/Singapore">Asia/Singapore</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Language
                      </label>
                      <select
                        value={settings.general.language}
                        onChange={(e) =>
                          handleInputChange(
                            "general",
                            "language",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="en">English</option>
                        <option value="id">Indonesian</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Maintenance Mode</p>
                      <p className="text-gray-400 text-sm">
                        Enable maintenance mode to restrict access
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.general.maintenance_mode}
                        onChange={(e) =>
                          handleInputChange(
                            "general",
                            "maintenance_mode",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Email Settings */}
              {activeTab === "email" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtp_host}
                        onChange={(e) =>
                          handleInputChange(
                            "email",
                            "smtp_host",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        value={settings.email.smtp_port}
                        onChange={(e) =>
                          handleInputChange(
                            "email",
                            "smtp_port",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        SMTP Username
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtp_username}
                        onChange={(e) =>
                          handleInputChange(
                            "email",
                            "smtp_username",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        SMTP Password
                      </label>
                      <input
                        type="password"
                        value={settings.email.smtp_password}
                        onChange={(e) =>
                          handleInputChange(
                            "email",
                            "smtp_password",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        From Email
                      </label>
                      <input
                        type="email"
                        value={settings.email.from_email}
                        onChange={(e) =>
                          handleInputChange(
                            "email",
                            "from_email",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        From Name
                      </label>
                      <input
                        type="text"
                        value={settings.email.from_name}
                        onChange={(e) =>
                          handleInputChange(
                            "email",
                            "from_name",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.security.session_timeout}
                        onChange={(e) =>
                          handleInputChange(
                            "security",
                            "session_timeout",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        value={settings.security.max_login_attempts}
                        onChange={(e) =>
                          handleInputChange(
                            "security",
                            "max_login_attempts",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Password Min Length
                      </label>
                      <input
                        type="number"
                        value={settings.security.password_min_length}
                        onChange={(e) =>
                          handleInputChange(
                            "security",
                            "password_min_length",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Max File Size (MB)
                      </label>
                      <input
                        type="number"
                        value={settings.security.max_file_size}
                        onChange={(e) =>
                          handleInputChange(
                            "security",
                            "max_file_size",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">
                          Require Two-Factor Authentication
                        </p>
                        <p className="text-gray-400 text-sm">
                          Force users to enable 2FA
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.security.require_2fa}
                          onChange={(e) =>
                            handleInputChange(
                              "security",
                              "require_2fa",
                              e.target.checked
                            )
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Database Settings */}
              {activeTab === "database" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Connection Type
                      </label>
                      <select
                        value={settings.database.connection}
                        onChange={(e) =>
                          handleInputChange(
                            "database",
                            "connection",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="mysql">MySQL</option>
                        <option value="postgresql">PostgreSQL</option>
                        <option value="sqlite">SQLite</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Host
                      </label>
                      <input
                        type="text"
                        value={settings.database.host}
                        onChange={(e) =>
                          handleInputChange("database", "host", e.target.value)
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Port
                      </label>
                      <input
                        type="number"
                        value={settings.database.port}
                        onChange={(e) =>
                          handleInputChange(
                            "database",
                            "port",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Database Name
                      </label>
                      <input
                        type="text"
                        value={settings.database.database}
                        onChange={(e) =>
                          handleInputChange(
                            "database",
                            "database",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={settings.database.username}
                        onChange={(e) =>
                          handleInputChange(
                            "database",
                            "username",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={settings.database.password}
                        onChange={(e) =>
                          handleInputChange(
                            "database",
                            "password",
                            e.target.value
                          )
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">
                          Email Notifications
                        </p>
                        <p className="text-gray-400 text-sm">
                          Send notifications via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.email_notifications}
                          onChange={(e) =>
                            handleInputChange(
                              "notifications",
                              "email_notifications",
                              e.target.checked
                            )
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">
                          Push Notifications
                        </p>
                        <p className="text-gray-400 text-sm">
                          Send push notifications
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.push_notifications}
                          onChange={(e) =>
                            handleInputChange(
                              "notifications",
                              "push_notifications",
                              e.target.checked
                            )
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Slack Webhook URL
                      </label>
                      <input
                        type="url"
                        value={settings.notifications.slack_webhook}
                        onChange={(e) =>
                          handleInputChange(
                            "notifications",
                            "slack_webhook",
                            e.target.value
                          )
                        }
                        placeholder="https://hooks.slack.com/services/..."
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Telegram Bot Token
                      </label>
                      <input
                        type="text"
                        value={settings.notifications.telegram_bot_token}
                        onChange={(e) =>
                          handleInputChange(
                            "notifications",
                            "telegram_bot_token",
                            e.target.value
                          )
                        }
                        placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
}

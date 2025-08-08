"use client";

import { useState, useEffect } from "react";
import SecureRoute from "../components/SecureRoute";
import SecureDashboard from "../components/SecureDashboard";
import {
  Shield,
  Lock,
  Key,
  Eye,
  EyeOff,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  User,
  Trash2,
} from "lucide-react";

interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
  status: "active" | "expired";
}

interface SecurityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress: string;
  location: string;
  status: "success" | "failed" | "warning";
}

export default function SecurityPage() {
  const [sessions, setSessions] = useState<SecuritySession[]>([]);
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummySessions: SecuritySession[] = [
        {
          id: "1",
          device: "MacBook Pro",
          browser: "Chrome 120.0.0.0",
          location: "Jakarta, Indonesia",
          ipAddress: "192.168.1.100",
          lastActive: "2024-01-20T10:30:00Z",
          isCurrent: true,
          status: "active",
        },
        {
          id: "2",
          device: "iPhone 15",
          browser: "Safari Mobile",
          location: "Bandung, Indonesia",
          ipAddress: "192.168.1.101",
          lastActive: "2024-01-19T15:20:00Z",
          isCurrent: false,
          status: "active",
        },
        {
          id: "3",
          device: "Windows PC",
          browser: "Firefox 121.0",
          location: "Surabaya, Indonesia",
          ipAddress: "192.168.1.102",
          lastActive: "2024-01-18T09:15:00Z",
          isCurrent: false,
          status: "expired",
        },
      ];

      const dummyLogs: SecurityLog[] = [
        {
          id: "1",
          action: "Login",
          description: "Successful login from Chrome browser",
          timestamp: "2024-01-20T10:30:00Z",
          ipAddress: "192.168.1.100",
          location: "Jakarta, Indonesia",
          status: "success",
        },
        {
          id: "2",
          action: "Password Change",
          description: "Password changed successfully",
          timestamp: "2024-01-19T14:20:00Z",
          ipAddress: "192.168.1.100",
          location: "Jakarta, Indonesia",
          status: "success",
        },
        {
          id: "3",
          action: "Failed Login",
          description: "Failed login attempt with incorrect password",
          timestamp: "2024-01-18T16:45:00Z",
          ipAddress: "192.168.1.103",
          location: "Unknown",
          status: "failed",
        },
        {
          id: "4",
          action: "Two-Factor Setup",
          description: "Two-factor authentication enabled",
          timestamp: "2024-01-17T11:30:00Z",
          ipAddress: "192.168.1.100",
          location: "Jakarta, Indonesia",
          status: "success",
        },
      ];

      setSessions(dummySessions);
      setSecurityLogs(dummyLogs);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const terminateSession = (sessionId: string) => {
    if (confirm("Are you sure you want to terminate this session?")) {
      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    }
  };

  const terminateAllSessions = () => {
    if (confirm("Are you sure you want to terminate all other sessions?")) {
      setSessions((prev) => prev.filter((session) => session.isCurrent));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="text-green-500" size={16} />;
      case "failed":
        return <XCircle className="text-red-500" size={16} />;
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={16} />;
      default:
        return <CheckCircle className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <SecureRoute>
        <SecureDashboard>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </SecureDashboard>
      </SecureRoute>
    );
  }

  return (
    <SecureRoute>
      <SecureDashboard>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Security Settings
              </h1>
              <p className="text-gray-400">
                Manage your account security and privacy
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password Change */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="text-blue-500" size={24} />
                <h3 className="text-lg font-semibold text-white">
                  Change Password
                </h3>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  Change Password
                </button>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <Smartphone className="text-green-500" size={24} />
                <h3 className="text-lg font-semibold text-white">
                  Two-Factor Authentication
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">SMS Authentication</p>
                    <p className="text-gray-400 text-sm">
                      Receive codes via SMS
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">
                      Email Authentication
                    </p>
                    <p className="text-gray-400 text-sm">
                      Receive codes via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Authenticator App</p>
                    <p className="text-gray-400 text-sm">
                      Use Google Authenticator or similar
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="text-purple-500" size={24} />
                <h3 className="text-lg font-semibold text-white">
                  Active Sessions
                </h3>
              </div>
              <button
                onClick={terminateAllSessions}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
                <span>Terminate All Others</span>
              </button>
            </div>

            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-white font-medium">
                          {session.device}
                        </p>
                        {session.isCurrent && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{session.browser}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <MapPin size={12} />
                          <span>{session.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{formatDateTime(session.lastActive)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        session.status === "active"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {session.status}
                    </span>
                    {!session.isCurrent && (
                      <button
                        onClick={() => terminateSession(session.id)}
                        className="p-2 hover:bg-gray-600 rounded transition-colors"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Logs */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <Key className="text-yellow-500" size={24} />
              <h3 className="text-lg font-semibold text-white">
                Security Activity
              </h3>
            </div>

            <div className="space-y-4">
              {securityLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(log.status)}
                    <div>
                      <p className="text-white font-medium">{log.action}</p>
                      <p className="text-gray-400 text-sm">{log.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{formatDateTime(log.timestamp)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin size={12} />
                          <span>{log.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium ${getStatusColor(
                      log.status
                    )}`}
                  >
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Tips */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="text-orange-500" size={24} />
              <h3 className="text-lg font-semibold text-white">
                Security Tips
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-2">Strong Password</h4>
                <p className="text-gray-400 text-sm">
                  Use a combination of letters, numbers, and special characters.
                  Avoid common words and personal information.
                </p>
              </div>

              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-2">
                  Two-Factor Authentication
                </h4>
                <p className="text-gray-400 text-sm">
                  Enable 2FA for an extra layer of security. This helps protect
                  your account even if your password is compromised.
                </p>
              </div>

              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-2">Regular Updates</h4>
                <p className="text-gray-400 text-sm">
                  Keep your devices and browsers updated to the latest versions
                  to protect against security vulnerabilities.
                </p>
              </div>

              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-2">
                  Monitor Activity
                </h4>
                <p className="text-gray-400 text-sm">
                  Regularly check your security logs and active sessions to
                  identify any suspicious activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
}

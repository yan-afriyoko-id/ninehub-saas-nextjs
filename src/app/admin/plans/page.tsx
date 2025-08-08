"use client";

import { useState, useEffect } from "react";
import SecureRoute from "../../components/SecureRoute";
import SecureDashboard from "../../components/SecureDashboard";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  MoreVertical,
  CreditCard,
  Crown,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Users,
  Zap,
} from "lucide-react";

interface PlanUI {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: "monthly" | "yearly" | "lifetime";
  maxUsers: number;
  maxStorage: number;
  features: string[];
  is_active: boolean;
  isPopular: boolean;
  subscriberCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<PlanUI[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<PlanUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanUI | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyPlans: PlanUI[] = [
        {
          id: "1",
          name: "Free Plan",
          slug: "free",
          description: "Basic plan for small businesses",
          price: 0,
          currency: "IDR",
          billingCycle: "monthly",
          maxUsers: 5,
          maxStorage: 100,
          features: ["Basic CRM", "5 Users", "100MB Storage", "Email Support"],
          is_active: true,
          isPopular: false,
          subscriberCount: 150,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-20T14:30:00Z",
        },
        {
          id: "2",
          name: "Starter Plan",
          slug: "starter",
          description: "Perfect for growing businesses",
          price: 299000,
          currency: "IDR",
          billingCycle: "monthly",
          maxUsers: 25,
          maxStorage: 1000,
          features: [
            "Full CRM",
            "25 Users",
            "1GB Storage",
            "Priority Support",
            "AI Chat",
          ],
          is_active: true,
          isPopular: true,
          subscriberCount: 89,
          createdAt: "2024-01-05T10:00:00Z",
          updatedAt: "2024-01-18T16:45:00Z",
        },
        {
          id: "3",
          name: "Professional Plan",
          slug: "professional",
          description: "Advanced features for established companies",
          price: 799000,
          currency: "IDR",
          billingCycle: "monthly",
          maxUsers: 100,
          maxStorage: 5000,
          features: [
            "Full CRM",
            "100 Users",
            "5GB Storage",
            "Priority Support",
            "AI Chat",
            "Advanced Analytics",
            "API Access",
          ],
          is_active: true,
          isPopular: false,
          subscriberCount: 34,
          createdAt: "2024-01-10T09:00:00Z",
          updatedAt: "2024-01-17T10:30:00Z",
        },
        {
          id: "4",
          name: "Enterprise Plan",
          slug: "enterprise",
          description: "Custom solutions for large organizations",
          price: 1999000,
          currency: "IDR",
          billingCycle: "monthly",
          maxUsers: 1000,
          maxStorage: 50000,
          features: [
            "Full CRM",
            "Unlimited Users",
            "50GB Storage",
            "24/7 Support",
            "AI Chat",
            "Advanced Analytics",
            "API Access",
            "Custom Integrations",
            "Dedicated Account Manager",
          ],
          is_active: true,
          isPopular: false,
          subscriberCount: 12,
          createdAt: "2024-01-12T11:30:00Z",
          updatedAt: "2024-01-19T13:20:00Z",
        },
        {
          id: "5",
          name: "Legacy Plan",
          slug: "legacy",
          description: "Deprecated plan for existing customers",
          price: 199000,
          currency: "IDR",
          billingCycle: "monthly",
          maxUsers: 10,
          maxStorage: 500,
          features: ["Basic CRM", "10 Users", "500MB Storage", "Email Support"],
          is_active: false,
          isPopular: false,
          subscriberCount: 8,
          createdAt: "2023-12-01T00:00:00Z",
          updatedAt: "2024-01-15T09:15:00Z",
        },
      ];
      setPlans(dummyPlans);
      setFilteredPlans(dummyPlans);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = plans;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (plan) =>
          plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((plan) =>
        filterStatus === "active" ? plan.is_active : !plan.is_active
      );
    }

    setFilteredPlans(filtered);
  }, [plans, searchTerm, filterStatus]);

  const handleToggleStatus = (planId: string) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId ? { ...plan, is_active: !plan.is_active } : plan
      )
    );
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans((prev) => prev.filter((plan) => plan.id !== planId));
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? (
      <CheckCircle className="text-green-500" size={16} />
    ) : (
      <XCircle className="text-red-500" size={16} />
    );
  };

  const getPlanColor = (planName: string) => {
    const colorMap: { [key: string]: string } = {
      "Free Plan": "bg-gray-600",
      "Starter Plan": "bg-blue-600",
      "Professional Plan": "bg-purple-600",
      "Enterprise Plan": "bg-red-600",
      "Legacy Plan": "bg-yellow-600",
    };
    return colorMap[planName] || "bg-gray-600";
  };

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case "Free Plan":
        return <Star size={16} />;
      case "Starter Plan":
        return <Zap size={16} />;
      case "Professional Plan":
        return <Crown size={16} />;
      case "Enterprise Plan":
        return <Crown size={16} />;
      case "Legacy Plan":
        return <AlertTriangle size={16} />;
      default:
        return <CreditCard size={16} />;
    }
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

  return (
    <SecureRoute adminOnly={true}>
      <SecureDashboard>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Plan Management</h1>
              <p className="text-gray-400">
                Manage subscription plans and pricing
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              <span>Add Plan</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "all" | "active" | "inactive")
              }
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-gray-800 rounded-lg p-6 border ${
                  plan.isPopular ? "border-blue-500" : "border-gray-700"
                } hover:border-gray-600 transition-colors relative`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${getPlanColor(plan.name)}`}
                    >
                      {getPlanIcon(plan.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {plan.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{plan.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(plan.is_active)}
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{plan.description}</p>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="text-3xl font-bold text-white">
                    {plan.price === 0
                      ? "Free"
                      : formatCurrency(plan.price, plan.currency)}
                  </div>
                  <div className="text-gray-400 text-sm">
                    per {plan.billingCycle}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Max Users:</span>
                    <span className="text-white font-medium">
                      {plan.maxUsers === 1000 ? "Unlimited" : plan.maxUsers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Storage:</span>
                    <span className="text-white font-medium">
                      {plan.maxStorage}MB
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Subscribers:</span>
                    <span className="text-white font-medium">
                      {plan.subscriberCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Status:</span>
                    <span
                      className={`${
                        plan.is_active ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {plan.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="mb-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-xs mb-2">Features:</p>
                  <div className="space-y-1">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs text-gray-300"
                      >
                        <CheckCircle
                          className="text-green-500 mr-2"
                          size={12}
                        />
                        {feature}
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <div className="text-xs text-gray-400">
                        +{plan.features.length - 3} more features
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => setEditingPlan(plan)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleToggleStatus(plan.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded text-sm transition-colors ${
                      plan.is_active
                        ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {plan.is_active ? (
                      <XCircle size={14} />
                    ) : (
                      <CheckCircle size={14} />
                    )}
                    <span>{plan.is_active ? "Disable" : "Enable"}</span>
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-white mt-4">
                No plans found
              </h3>
              <p className="text-gray-400 mt-2">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first plan."}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Plans</p>
                  <p className="text-2xl font-bold text-white">
                    {plans.length}
                  </p>
                </div>
                <CreditCard className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Plans</p>
                  <p className="text-2xl font-bold text-white">
                    {plans.filter((p) => p.is_active).length}
                  </p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Subscribers</p>
                  <p className="text-2xl font-bold text-white">
                    {plans.reduce(
                      (total, plan) => total + plan.subscriberCount,
                      0
                    )}
                  </p>
                </div>
                <Users className="text-purple-500" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(
                      plans.reduce(
                        (total, plan) =>
                          total + plan.price * plan.subscriberCount,
                        0
                      ),
                      "IDR"
                    )}
                  </p>
                </div>
                <DollarSign className="text-yellow-500" size={24} />
              </div>
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
}

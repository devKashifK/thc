"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data - In a real app, this would come from an API
const mockCampaigns = [
  {
    id: 1,
    title: "Summer Collection Launch",
    brand: "Fashion Brand X",
    status: "Active",
    budget: "$50,000",
    spent: "$32,450",
    startDate: "2024-06-01",
    endDate: "2024-07-31",
    creators: 12,
    engagement: "4.8%",
    reach: "2.1M",
    clicks: "45.2K",
    conversions: "2.3K",
    roi: "327%",
  },
  {
    id: 2,
    title: "Fitness Challenge",
    brand: "GymFit Pro",
    status: "Pending",
    budget: "$30,000",
    spent: "$0",
    startDate: "2024-07-01",
    endDate: "2024-08-31",
    creators: 8,
    engagement: "0%",
    reach: "0",
    clicks: "0",
    conversions: "0",
    roi: "0%",
  },
  {
    id: 3,
    title: "Tech Review Series",
    brand: "TechGiant",
    status: "Completed",
    budget: "$75,000",
    spent: "$75,000",
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    creators: 15,
    engagement: "5.1%",
    reach: "3.5M",
    clicks: "82.1K",
    conversions: "4.2K",
    roi: "412%",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  Completed: "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100",
  Paused: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
};

export default function CampaignsPage() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Campaign Management
          </h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Campaign
          </button>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Active Campaigns
            </h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              8
            </p>
            <p className="mt-1 text-sm text-green-500">+2 this month</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Budget
            </h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              $155K
            </p>
            <p className="mt-1 text-sm text-green-500">+$45K from last month</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Avg. Engagement
            </h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              4.9%
            </p>
            <p className="mt-1 text-sm text-green-500">+0.3% from last month</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total ROI
            </h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              327%
            </p>
            <p className="mt-1 text-sm text-green-500">+15% from last month</p>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-64 px-4 py-2 pl-10 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Paused</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg ${
                view === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-500"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-500"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Campaigns Grid/List */}
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {mockCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {campaign.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      statusColors[campaign.status as keyof typeof statusColors]
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {campaign.brand}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Budget
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {campaign.budget}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Spent
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {campaign.spent}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Start Date
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      End Date
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Creators
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {campaign.creators}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Reach
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {campaign.reach}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Clicks
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {campaign.clicks}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      ROI
                    </p>
                    <p className="text-lg font-semibold text-green-500">
                      {campaign.roi}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

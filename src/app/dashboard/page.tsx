"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data - In a real app, this would come from an API
const mockData = {
  metrics: [
    { title: "Total Creators", value: "10.2K", change: "+12%", trend: "up" },
    { title: "Active Campaigns", value: "234", change: "+5%", trend: "up" },
    { title: "Avg. Engagement", value: "4.8%", change: "-2%", trend: "down" },
    { title: "Total Revenue", value: "$1.2M", change: "+18%", trend: "up" },
  ],
  recentCampaigns: [
    {
      id: 1,
      title: "Summer Collection Launch",
      brand: "Fashion Brand X",
      status: "Active",
      budget: "$50,000",
      engagement: "4.8%",
    },
    {
      id: 2,
      title: "Fitness Challenge",
      brand: "GymFit Pro",
      status: "Pending",
      budget: "$30,000",
      engagement: "3.2%",
    },
    {
      id: 3,
      title: "Tech Review Series",
      brand: "TechGiant",
      status: "Completed",
      budget: "$75,000",
      engagement: "5.1%",
    },
  ],
  topCreators: [
    {
      id: 1,
      name: "Sarah Johnson",
      category: "Lifestyle",
      followers: "1.2M",
      engagement: "5.8%",
    },
    {
      id: 2,
      name: "Mike Chen",
      category: "Tech",
      followers: "850K",
      engagement: "4.9%",
    },
    {
      id: 3,
      name: "Emma Davis",
      category: "Fashion",
      followers: "2.1M",
      engagement: "6.2%",
    },
  ],
};

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

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
            Dashboard Overview
          </h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Campaign
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockData.metrics.map((metric, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {metric.title}
                </h3>
                <span
                  className={`text-sm ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Campaigns */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Campaigns
            </h2>
            <div className="space-y-4">
              {mockData.recentCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {campaign.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : campaign.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{campaign.brand}</span>
                    <span className="mx-2">•</span>
                    <span>{campaign.budget}</span>
                    <span className="mx-2">•</span>
                    <span>{campaign.engagement} Engagement</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Creators */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Creators
            </h2>
            <div className="space-y-4">
              {mockData.topCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {creator.name.charAt(0)}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {creator.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{creator.category}</span>
                      <span className="mx-2">•</span>
                      <span>{creator.followers} Followers</span>
                      <span className="mx-2">•</span>
                      <span>{creator.engagement} Engagement</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

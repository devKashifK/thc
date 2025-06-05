"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data - In a real app, this would come from an API
const mockAnalytics = {
  overview: {
    totalReach: "12.5M",
    totalEngagement: "850K",
    avgEngagementRate: "4.8%",
    totalConversions: "25.2K",
    conversionRate: "2.9%",
    totalRevenue: "$1.2M",
    roi: "327%",
  },
  topPerformers: [
    {
      id: 1,
      name: "Sarah Johnson",
      platform: "Instagram",
      reach: "2.1M",
      engagement: "5.8%",
      conversions: "3.2K",
      revenue: "$125K",
    },
    {
      id: 2,
      name: "Mike Chen",
      platform: "YouTube",
      reach: "1.8M",
      engagement: "4.9%",
      conversions: "2.8K",
      revenue: "$98K",
    },
    {
      id: 3,
      name: "Emma Davis",
      platform: "TikTok",
      reach: "3.2M",
      engagement: "6.2%",
      conversions: "4.1K",
      revenue: "$145K",
    },
  ],
  recentCampaigns: [
    {
      id: 1,
      title: "Summer Collection",
      status: "Active",
      reach: "2.1M",
      engagement: "4.8%",
      conversions: "2.3K",
      revenue: "$85K",
    },
    {
      id: 2,
      title: "Tech Launch",
      status: "Completed",
      reach: "3.5M",
      engagement: "5.1%",
      conversions: "4.2K",
      revenue: "$156K",
    },
    {
      id: 3,
      title: "Fitness Challenge",
      status: "Active",
      reach: "1.8M",
      engagement: "5.5%",
      conversions: "1.9K",
      revenue: "$72K",
    },
  ],
  platformPerformance: [
    {
      platform: "Instagram",
      reach: "5.2M",
      engagement: "4.9%",
      conversions: "8.5K",
      revenue: "$420K",
    },
    {
      platform: "TikTok",
      reach: "4.8M",
      engagement: "5.2%",
      conversions: "7.2K",
      revenue: "$380K",
    },
    {
      platform: "YouTube",
      reach: "2.5M",
      engagement: "4.2%",
      conversions: "9.5K",
      revenue: "$400K",
    },
  ],
};

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Analytics & Insights
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Track your campaign performance and ROI
            </p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(mockAnalytics.overview).map(([key, value]) => (
            <div
              key={key}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Top Performers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Creators
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  <th className="pb-4">Creator</th>
                  <th className="pb-4">Platform</th>
                  <th className="pb-4">Reach</th>
                  <th className="pb-4">Engagement</th>
                  <th className="pb-4">Conversions</th>
                  <th className="pb-4">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mockAnalytics.topPerformers.map((performer) => (
                  <tr key={performer.id}>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                          {performer.name.charAt(0)}
                        </div>
                        <span className="ml-3 font-medium text-gray-900 dark:text-white">
                          {performer.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">{performer.platform}</td>
                    <td className="py-4">{performer.reach}</td>
                    <td className="py-4">{performer.engagement}</td>
                    <td className="py-4">{performer.conversions}</td>
                    <td className="py-4">{performer.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Platform Performance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  <th className="pb-4">Platform</th>
                  <th className="pb-4">Reach</th>
                  <th className="pb-4">Engagement</th>
                  <th className="pb-4">Conversions</th>
                  <th className="pb-4">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mockAnalytics.platformPerformance.map((platform) => (
                  <tr key={platform.platform}>
                    <td className="py-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {platform.platform}
                      </span>
                    </td>
                    <td className="py-4">{platform.reach}</td>
                    <td className="py-4">{platform.engagement}</td>
                    <td className="py-4">{platform.conversions}</td>
                    <td className="py-4">{platform.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Campaign Performance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  <th className="pb-4">Campaign</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Reach</th>
                  <th className="pb-4">Engagement</th>
                  <th className="pb-4">Conversions</th>
                  <th className="pb-4">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {mockAnalytics.recentCampaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="py-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {campaign.title}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          campaign.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-4">{campaign.reach}</td>
                    <td className="py-4">{campaign.engagement}</td>
                    <td className="py-4">{campaign.conversions}</td>
                    <td className="py-4">{campaign.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

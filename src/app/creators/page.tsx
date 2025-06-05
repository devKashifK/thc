"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data - In a real app, this would come from an API
const mockCreators = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarahliving",
    avatar: "/avatars/sarah.jpg",
    category: "Lifestyle",
    followers: "1.2M",
    engagement: "5.8%",
    location: "Los Angeles, CA",
    platforms: ["Instagram", "TikTok", "YouTube"],
    recentPosts: 156,
    avgLikes: "45K",
    verified: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    username: "@techmikechen",
    avatar: "/avatars/mike.jpg",
    category: "Tech",
    followers: "850K",
    engagement: "4.9%",
    location: "San Francisco, CA",
    platforms: ["YouTube", "Twitter", "Instagram"],
    recentPosts: 89,
    avgLikes: "32K",
    verified: true,
  },
  // Add more mock creators...
];

const categories = [
  "All Categories",
  "Lifestyle",
  "Tech",
  "Fashion",
  "Beauty",
  "Fitness",
  "Food",
  "Travel",
  "Gaming",
];

const platforms = ["Instagram", "TikTok", "YouTube", "Twitter"];

export default function CreatorsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("followers");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Creator Discovery
          </h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Invite Creator
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="space-y-4">
            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="followers">Sort by Followers</option>
                  <option value="engagement">Sort by Engagement</option>
                  <option value="posts">Sort by Posts</option>
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Platform Filter */}
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedPlatforms.includes(platform)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCreators.map((creator) => (
            <div
              key={creator.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              {/* Creator Card Header */}
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-medium">
                      {creator.name.charAt(0)}
                    </div>
                    {creator.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {creator.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {creator.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {creator.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Creator Stats */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Followers
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {creator.followers}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Engagement
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {creator.engagement}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Avg. Likes
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {creator.avgLikes}
                  </p>
                </div>
              </div>

              {/* Platforms */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {creator.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { TPost } from "@/src/types";
import PostCard from "./PostCard";
import { useUser } from "@/src/context/user.provider";
import FilterBar from "./FilterBar";
import { FaSearch } from "react-icons/fa";
import { Input } from "@nextui-org/input";

const Post = ({ posts }: { posts: TPost[] }) => {
  const { user } = useUser(); // Access the user context
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [sortByUpvotes, setSortByUpvotes] = useState(false);

  const isAuthenticated = !!user;

  // Unique categories and users for filter dropdowns
  const categories = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.category)));
  }, [posts]);

  const users = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.user?.name)));
  }, [posts]);

  // Filter, search, and sort logic
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Search by title or content
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    // Filter by user
    if (userFilter) {
      filtered = filtered.filter((post) => post.user?.name === userFilter);
    }

    // Sort by upvote count if needed
    if (sortByUpvotes) {
      filtered = filtered.sort((a, b) => (b.upvote || 0) - (a.upvote || 0));
    }

    return filtered;
  }, [posts, searchTerm, categoryFilter, userFilter, sortByUpvotes]);

  return (
    <div className="relative md:mt-24">
      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Fixed Search Bar */}
        <div className="fixed top-16 md:top-[88px] left-0 right-0 p-4 bg-white w-full shadow-md z-10 md:max-w-[720px] mx-auto flex items-center">
          <FaSearch className="absolute left-7 w-5 h-5 top-6 text-gray-500" />
          <Input
            type="text"
            placeholder="Search posts by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border border-gray-300 rounded w-full"
          />
          {/* Dropdown for Category Filter (Visible only on small devices) */}
          <div className="relative ml-4 md:hidden">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded text-teal-700"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              console.log("Searching for:", searchTerm);
            }}
            className="ml-3 px-4 py-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-white rounded"
          >
            Search
          </button>
        </div>

        {/* Display Posts */}
        <div className="flex-grow mx-auto my-3 w-full md:max-w-[720px] md:mt-16 mt-32">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post: TPost, index) => (
              <PostCard
                key={index}
                post={post}
                isAuthenticated={isAuthenticated}
              />
            ))
          ) : (
            <p>No posts found matching your criteria.</p>
          )}
        </div>

        {/* Fixed Category Filter Container on Large Devices */}
        <div className="hidden md:w-1/4 md:fixed right-0 top-20 md:block">
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
            sortByUpvotes={sortByUpvotes}
            setSortByUpvotes={setSortByUpvotes}
            categories={categories}
            users={users}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;

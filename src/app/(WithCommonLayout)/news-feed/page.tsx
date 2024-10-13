"use server";

import React from "react";
import Post from "@/src/components/Posts/Post";
import { getRecentPosts } from "@/src/services/RecentPosts";
import Filtering from "@/src/components/Posts/Filtering";
import { TPost } from "@/src/types";
import FilterDropdown from "@/src/components/Posts/FilterDropdownProps";
import axiosInstance from "@/src/lib/AxiosInstance";

interface NewsFeedProps {
  searchParams?: { query?: string; category?: string; page?: string };
}

const NewsFeed = async ({ searchParams }: NewsFeedProps) => {
  const params = new URLSearchParams(searchParams as any);
  const searchTerm = params.get("search");
  const userId = params.get("userId"); // Use "search" instead of "query"
  const category = params.get("category");

  const queryParams = [];

  // Add searchTerm if it exists
  if (searchTerm) {
    queryParams.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
  }

  // Add userId if it exists
  if (userId) {
    queryParams.push(`user=${encodeURIComponent(userId)}`);
  }

  // Add category if it exists
  if (category) {
    queryParams.push(`category=${encodeURIComponent(category)}`);
  }
  // Join query parameters with '&' and make the API request
  const { data } = await axiosInstance.get(`/post?${queryParams.join("&")}`);
  const searchResults = data?.data;
  // Fetch recent posts for default display
  const { data: recentPosts } = await getRecentPosts();

  // Ensure recentPosts is typed correctly as TPost[]
  const categories: string[] = Array.from(
    new Set(recentPosts.map((post: TPost) => post.category as string))
  );
  const userNames: string[] = Array.from(
    new Set(recentPosts.map((post: TPost) => post?.user?.name).filter(Boolean))
  );
  const userIds: string[] = Array.from(
    new Set(recentPosts.map((post: TPost) => post?.user?._id))
  );

  const postsToDisplay =
    searchTerm || userId || category ? searchResults : recentPosts;
  return (
    <div className="min-h-screen max-w-7xl md:mt-16 mx-auto bg-gray-100 p-6">
      {/* Large Device Filter - displayed as a sidebar */}
      <div className="hidden md:block">
        <Filtering
          categories={categories}
          userNames={userNames}
          userIds={userIds}
        />
      </div>

      {/* Small Device Filter - managed by a client component */}
      <div className="md:hidden mb-4">
        <FilterDropdown
          categories={categories}
          userNames={userNames}
          userIds={userIds}
        />
      </div>

      {/* Post content */}
      <Post
        categories={categories}
        userNames={userNames}
        posts={postsToDisplay}

        // recentPosts={recentPosts}
      />
    </div>
  );
};

export default NewsFeed;

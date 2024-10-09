"use server";

import React from "react";
import Post from "@/src/components/Posts/Post";
import { getRecentPosts } from "@/src/services/RecentPosts";

interface NewsFeedProps {
  searchParams?: { page?: string };
}

const NewsFeed: React.FC<NewsFeedProps> = async ({ searchParams }) => {
  // Get page number from query params or default to 1
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const postsPerPage = 10;

  // Fetch posts for the current page
  const { data: recentPosts } = await getRecentPosts(currentPage, postsPerPage);

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-100 p-6">
      <Post posts={recentPosts} /> {/* Pass the fetched posts */}
      {/* Add Next and Previous buttons for pagination */}
      <div className="flex justify-between mt-4">
        {currentPage > 1 && (
          <a
            href={`?page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous Page
          </a>
        )}
        {recentPosts.length === postsPerPage && (
          <a
            href={`?page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next Page
          </a>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;

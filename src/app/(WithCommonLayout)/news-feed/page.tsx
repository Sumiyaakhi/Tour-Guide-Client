"use server";

import React from "react";
import Post from "@/src/components/Posts/Post";
import { getRecentPosts } from "@/src/services/RecentPosts";

const NewsFeed: React.FC = async () => {
  const { data: recentposts } = await getRecentPosts();

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-100 p-6">
      <Post posts={recentposts} /> {/* Pass both props */}
    </div>
  );
};

export default NewsFeed;

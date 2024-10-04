"use server";

import React from "react";
import { getAllPosts } from "@/src/services/PostApi";
import Post from "@/src/components/Posts/Post";
import { useUser } from "@/src/context/user.provider";

const NewsFeed: React.FC = async () => {
  const data = await getAllPosts();
  // true if user exists, false otherwise

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Post posts={data.data} /> {/* Pass both props */}
    </div>
  );
};

export default NewsFeed;

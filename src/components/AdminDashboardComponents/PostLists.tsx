"use client";

import React from "react";
import ContentManager from "./ContentManager";
import { useGetAllPosts } from "@/src/hooks/post.hook";

const PostsList: React.FC = () => {
  // Use the custom hook to fetch all posts
  const { data: posts, isLoading, error } = useGetAllPosts();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error fetching posts: {error.message}</div>; // Show error state
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold py-3">Post Manager</h1>
      <h3 className="text-xl md:text-2xl font-bold mb-3">
        Total Posts: {posts?.length || 0} {/* Display total number of posts */}
      </h3>
      {posts?.map((post) => (
        <ContentManager key={post._id} post={post} /> // Pass each post to ContentManager
      ))}
    </div>
  );
};

export default PostsList;

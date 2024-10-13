"use client";

import React from "react";
import { useUser } from "@/src/context/user.provider";
import PostCard from "../Posts/PostCard";
import { useGetMyPosts } from "@/src/hooks/post.hook"; // Import your custom hook
import { TPost } from "@/src/types";

const UserPosts: React.FC = () => {
  const { user } = useUser();
  const isAuthenticated = !!user;

  // Use the custom hook to fetch my posts
  const { data, isLoading, isError } = useGetMyPosts();
  const myPosts = data?.data || []; //
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or a skeleton component
  }

  if (isError) {
    return <div>Error fetching posts:</div>; // Display error message
  }

  return (
    <div className="max-w-5xl mx-auto">
      {isAuthenticated &&
        myPosts?.map((post: TPost, index: number) => (
          <PostCard key={index} post={post} isAuthenticated={isAuthenticated} />
        ))}
    </div>
  );
};

export default UserPosts;

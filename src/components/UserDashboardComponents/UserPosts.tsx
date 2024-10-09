"use client";

import { TPost } from "@/src/types";
import React from "react";
import { useUser } from "@/src/context/user.provider";
import PostCard from "../Posts/PostCard";
interface MyProfileProps {
  myPosts: TPost[];
}
const UserPosts: React.FC<MyProfileProps> = ({ myPosts }) => {
  const { user } = useUser();
  const isAuthenticated = user ? true : false;

  return (
    <div className="max-w-5xl mx-auto">
      {isAuthenticated &&
        myPosts.map((post, index) => (
          <PostCard key={index} post={post} isAuthenticated={isAuthenticated} />
        ))}
    </div>
  );
};

export default UserPosts;

"use server";

import UserPosts from "@/src/components/UserDashboardComponents/UserPosts";
import { getMyPosts } from "@/src/services/PostApi";
import React from "react";

const UserPostPage = async () => {
  try {
    const { data: myPosts } = await getMyPosts();

    return (
      <div>
        <UserPosts myPosts={myPosts} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts", error);
    return <p>Error loading profile</p>;
  }
};

export default UserPostPage;

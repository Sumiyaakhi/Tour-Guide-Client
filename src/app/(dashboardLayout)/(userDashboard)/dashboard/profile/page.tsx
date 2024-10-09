"use server";

import UserProfile from "@/src/components/UserDashboardComponents/UserProfile";
import { getMyPosts } from "@/src/services/PostApi";
import React from "react";

const UserProfilePage = async () => {
  try {
    const { data: myPosts } = await getMyPosts();

    return (
      <div>
        <UserProfile myPosts={myPosts} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts", error);
    return <p>Error loading profile</p>;
  }
};

export default UserProfilePage;

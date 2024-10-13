import UserPosts from "@/src/components/UserDashboardComponents/UserPosts";
import { getAllPosts } from "@/src/services/PostApi";
import React from "react";

const UserPostPage = async () => {
  try {
    const { data: myPosts } = await getAllPosts();

    return (
      <div>
        <UserPosts myPosts={myPosts} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts", error);
    return <p>Error loading posts</p>;
  }
};

export default UserPostPage;

"use server";

import UserManagement from "@/src/components/AdminDashboardComponents/UserManagement";
import axiosInstance from "@/src/lib/AxiosInstance";
import React from "react";

const UserManager = async () => {
  const res: any = await axiosInstance.get(`/auth/users`);
  // console.log("my post data", myPosts); // Log the posts to check if they are being fetched
  const allUsers = res.data.data;
  // console.log("all user data", data);
  return (
    <div>
      <UserManagement allUsers={allUsers} />
    </div>
  );
};

export default UserManager;

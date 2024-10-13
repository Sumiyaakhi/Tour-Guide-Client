"use server";

import UserManagement from "@/src/components/AdminDashboardComponents/UserManagement";
import axiosInstance from "@/src/lib/AxiosInstance";
import React from "react";

const UserManager = async () => {
  const res: any = await axiosInstance.get(`/auth/users`);
  const allUsers = res.data.data;
  return (
    <div>
      <UserManagement allUsers={allUsers} />
    </div>
  );
};

export default UserManager;

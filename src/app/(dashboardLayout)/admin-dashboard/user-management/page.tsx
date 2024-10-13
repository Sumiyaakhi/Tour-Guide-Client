"use server";

import UserManagement from "@/src/components/AdminDashboardComponents/UserManagement";
import axiosInstance from "@/src/lib/AxiosInstance";
import React from "react";

// This is a mock function to represent how you'd get the token
// In a real-world scenario, you might retrieve the token from cookies, session, or context.
const getToken = async (): Promise<string> => {
  // Replace this with actual logic to retrieve the token.
  return "your-auth-token";
};

const UserManager = async () => {
  try {
    const token = await getToken(); // Get the token
    const res: any = await axiosInstance.get(`/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const allUsers = res.data.data;

    return (
      <div>
        <UserManagement allUsers={allUsers} token={token} />{" "}
        {/* Pass the token */}
      </div>
    );
  } catch (error) {
    console.error("Failed to load user data", error);
    return <div>Error loading user data.</div>;
  }
};

export default UserManager;

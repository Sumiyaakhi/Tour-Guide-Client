"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

// Verify a user (Admin only)
export const verifyUser = async (
  userId: string,
  token: string
): Promise<any> => {
  try {
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.patch(
      `/auth/verify/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      }
    );

    revalidateTag("user-verification"); // Refresh the verification cache after verifying a user
    return data;
  } catch (error) {
    console.error("Failed to verify user", error);
    throw new Error("Failed to verify user");
  }
};

// Update profile details
export const updateUserProfile = async (
  userId: string,
  formData: FormData,
  token: string
): Promise<any> => {
  try {
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.put(`/auth/user/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include Bearer token
        "Content-Type": "multipart/form-data", // Set multipart for file uploads
      },
    });

    revalidateTag("user"); // Refresh the profile cache after updating
    return data;
  } catch (error) {
    console.error("Failed to update user profile", error);
    throw new Error("Failed to update user profile");
  }
};

// Follow a user
export const followUser = async (
  targetUserId: string,
  currentUserId: string,
  token: string
): Promise<any> => {
  try {
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.post(
      "/auth/follow", // Endpoint for following a user
      { targetUserId, currentUserId }, // Sending the target user ID in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      }
    );

    revalidateTag("user-following"); // Refresh the following cache after following a user
    return data;
  } catch (error) {
    console.error("Failed to follow user", error);
    throw new Error("Failed to follow user");
  }
};

// Update user role
export const updateUserRole = async (
  userId: string,
  newRole: "admin" | "user",
  token: string
): Promise<any> => {
  try {
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.patch(
      `/auth/user/${userId}`, // Endpoint for updating user role
      { role: newRole }, // Sending the new role in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token for authorization
        },
      }
    );

    revalidateTag("user-roles"); // Refresh the cache related to user roles after updating
    return data;
  } catch (error) {
    console.error("Failed to update user role", error);
    throw new Error("Failed to update user role");
  }
};

// Delete user
export const deleteUser = async (
  userId: string,
  token: string
): Promise<any> => {
  try {
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.delete(
      `/auth/${userId}`, // Endpoint for deleting a user by userId
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token for authorization
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Failed to delete user", error);
    throw new Error("Failed to delete user");
  }
};

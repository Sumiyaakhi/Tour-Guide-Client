"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import envConfig from "@/src/config/envConfig";
import { cookies } from "next/headers";

// Follow a user
export const followUser = async (userId: string): Promise<any> => {
  try {
    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.post(
      `/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      }
    );

    revalidateTag("user-follow"); // Refresh the follow cache after following a user
    return data;
  } catch (error) {
    console.error("Failed to follow user", error);
    throw new Error("Failed to follow user");
  }
};

// Unfollow a user
export const unfollowUser = async (userId: string): Promise<any> => {
  try {
    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.post(
      `/unfollow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      }
    );

    revalidateTag("user-follow"); // Refresh the follow cache after unfollowing a user
    return data;
  } catch (error) {
    console.error("Failed to unfollow user", error);
    throw new Error("Failed to unfollow user");
  }
};

// Verify a user (Admin only)
export const verifyUser = async (userId: string): Promise<any> => {
  try {
    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.patch(
      `/verify/${userId}`,
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
  formData: FormData
): Promise<any> => {
  try {
    const token = cookies().get("accessToken")?.value;

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

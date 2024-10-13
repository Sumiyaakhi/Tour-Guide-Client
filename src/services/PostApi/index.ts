"use client";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import envConfig from "@/src/config/envConfig";
import { getCurrentUser } from "../AuthService";

// Helper to get access token from local storage
const getToken = () => localStorage.getItem("accessToken");

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.post("/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    revalidateTag("posts");
    return data;
  } catch (error: any) {
    console.error(
      "Failed to create post:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create post");
  }
};

// Get a single post by ID
export const getPost = async (postId: string) => {
  try {
    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    const res = await fetch(`${envConfig.baseApi}/post/${postId}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Failed to fetch post: ${errorData.message}`);
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw new Error("Failed to fetch post");
  }
};

// Get all posts
export const getAllPosts = async () => {
  try {
    const res = await fetch(`${envConfig.baseApi}/post`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Failed to fetch all posts: ${errorData.message}`);
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch all posts:", error);
    throw new Error("Failed to fetch all posts");
  }
};

// Get posts by the current user
export const getMyPosts = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.get(`/post?user=${user?._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch user's posts:", error);
    throw new Error("Failed to fetch user's posts");
  }
};

// Update a post
export const updatePost = async (
  postId: string,
  formData: FormData
): Promise<any> => {
  try {
    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.put(`/post/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    revalidateTag("post");
    return data;
  } catch (error) {
    console.error("Failed to update post:", error);
    throw new Error("Failed to update post");
  }
};

// Delete a post
export const deletePost = async (postId: string): Promise<any> => {
  try {
    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.delete(`/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidateTag("post");
    return data;
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw new Error("Failed to delete post");
  }
};

// Increment upvote for a post
export const updateIncUpvote = async (postId: string) => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found, please log in");

    const { data } = await axiosInstance.put(
      `/post/upvoteInc/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidateTag("post");
    return data;
  } catch (error) {
    console.error("Failed to upvote post:", error);
    throw new Error("Failed to upvote post");
  }
};

// Decrement upvote for a post
export const updateDecUpvote = async (postId: string) => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found, please log in");

    const { data } = await axiosInstance.put(
      `/post/upvoteDec/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidateTag("post");
    return data;
  } catch (error) {
    console.error("Failed to decrement upvote:", error);
    throw new Error("Failed to decrement upvote");
  }
};

// Increment downvote for a post
export const updateIncDownvote = async (postId: string) => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found, please log in");

    const { data } = await axiosInstance.put(
      `/post/downvoteInc/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidateTag("post");
    return data;
  } catch (error) {
    console.error("Failed to downvote post:", error);
    throw new Error("Failed to downvote post");
  }
};

// Decrement downvote for a post
export const updateDecDownvote = async (postId: string) => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found, please log in");

    const { data } = await axiosInstance.put(
      `/post/downvoteDec/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidateTag("post");
    return data;
  } catch (error) {
    console.error("Failed to decrement downvote:", error);
    throw new Error("Failed to decrement downvote");
  }
};

// Add or update a comment on a post
export const addOrUpdateComment = async (
  postId: string,
  comment: string,
  commenter: string
) => {
  try {
    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.put(
      `/post/comment/${postId}`,
      {
        comment,
        commenter,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidateTag("post");
    return data;
  } catch (error) {
    console.error("Failed to update comment:", error);
    throw new Error("Failed to update comment");
  }
};

// Delete a comment on a post
export const deleteComment = async (postId: string, commentId: string) => {
  try {
    const token = getToken();
    if (!token) throw new Error("User not authenticated");

    const { data } = await axiosInstance.delete(
      `/post/${postId}/comment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidateTag("post");
    return data;
  } catch (error) {
    console.error("Failed to delete comment:", error);
    throw new Error("Failed to delete comment");
  }
};

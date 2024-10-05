"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { getCurrentUser } from "../AuthService";
import envConfig from "@/src/config/envConfig";
import { cookies } from "next/headers";

// Create a post
export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.post("/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Include Bearer token
      },
    });

    revalidateTag("posts"); // Refresh the post cache after creation
    return data;
  } catch (error) {
    console.error("Failed to create post", error);
    throw new Error("Failed to create post");
  }
};

// Get a single post by ID
export const getPost = async (postId: string) => {
  try {
    const res = await fetch(`${envConfig.baseApi}/post/${postId}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`, // Include Bearer token
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch post", error);
    throw new Error("Failed to fetch post");
  }
};

// Get all posts
export const getAllPosts = async () => {
  try {
    const res = await fetch(`${envConfig.baseApi}/post`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`, // Include Bearer token
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch all posts");
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch all posts", error);
    throw new Error("Failed to fetch all posts");
  }
};

// Get posts by the current user
export const getMyPosts = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.get(`/post?user=${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include Bearer token
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch user's posts", error);
    throw new Error("Failed to fetch user's posts");
  }
};

// Update a post
export const updatePost = async (
  postId: string,
  formData: FormData
): Promise<any> => {
  try {
    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.put(`/post/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Include Bearer token
      },
    });

    revalidateTag("post"); // Refresh the post cache after update
    return data;
  } catch (error) {
    console.error("Failed to update post", error);
    throw new Error("Failed to update post");
  }
};

// Delete a post
export const deletePost = async (postId: string): Promise<any> => {
  try {
    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.delete(`/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include Bearer token
      },
    });

    revalidateTag("post"); // Refresh the post cache after deletion
    return data;
  } catch (error) {
    console.error("Failed to delete post", error);
    throw new Error("Failed to delete post");
  }
};

// Update upvote for a post
export const updateIncUpvote = async (postId: string) => {
  try {
    const token = cookies().get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found, please log in");
    }

    const { data } = await axiosInstance.put(
      `/post/upvoteInc/${postId}`, // Ensure this route is correct
      {}, // Payload is empty if not needed
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      }
    );

    console.log(data); // Log response data
    revalidateTag("post"); // Refresh the post cache after upvote
    return data;
  } catch (error: any) {
    console.error(
      "Failed to upvote post",
      error.response ? error.response.data : error
    );
    throw new Error("Failed to upvote post");
  }
};

// Update downvote for a post
export const updateIncDownvote = async (postId: string) => {
  try {
    const token = cookies().get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found, please log in");
    }

    const { data } = await axiosInstance.put(
      `/post/downvoteInc/${postId}`, // Ensure this route is correct
      {}, // Payload is empty if not needed
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      }
    );

    console.log(data); // Log response data
    revalidateTag("post"); // Refresh the post cache after upvote
    return data;
  } catch (error: any) {
    console.error(
      "Failed to downvote post",
      error.response ? error.response.data : error
    );
    throw new Error("Failed to downvote post");
  }
};

// Update upvote for a post
export const updateDecUpvote = async (postId: string) => {
  try {
    const token = cookies().get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found, please log in");
    }

    const { data } = await axiosInstance.put(
      `/post/upvoteDec/${postId}`, // Ensure this route is correct

      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      }
    );

    console.log(data); // Log response data
    revalidateTag("post"); // Refresh the post cache after upvote
    return data;
  } catch (error: any) {
    console.error(
      "Failed to upvote post",
      error.response ? error.response.data : error
    );
    throw new Error("Failed to upvote post");
  }
};

// Update downvote for a post
export const updateDecDownvote = async (postId: string) => {
  try {
    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.put(`/post/downvoteDec/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include Bearer token
      },
    });
    console.log("downvote", data);
    revalidateTag("post");
    return data;
  } catch (error) {
    console.error("Failed to downvote post", error);
    throw new Error("Failed to downvote post");
  }
};

// Add or update a comment on a post
export const addOrUpdateComment = async (
  postId: string,
  comment: string,
  commenter: string
) => {
  try {
    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.put(
      `/post/comment/${postId}`,
      {
        comment,
        commenter,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      }
    );

    revalidateTag("post"); // Refresh the post cache after comment update
    return data;
  } catch (error) {
    console.error("Failed to update comment", error);
    throw new Error("Failed to update comment");
  }
};

// Update a specific comment on a post
export const updateComment = async (
  postId: string,
  commenter: string,
  comment: string
) => {
  try {
    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.put(
      `/post/${postId}/comment/${commenter}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      }
    );

    revalidateTag("post"); // Refresh the post cache after comment update
    return data;
  } catch (error) {
    console.error("Failed to update comment", error);
    throw new Error("Failed to update comment");
  }
};

// Delete a specific comment on a post
export const deleteComment = async (postId: string, commentId: string) => {
  try {
    const token = cookies().get("accessToken")?.value;

    const { data } = await axiosInstance.delete(
      `/post/${postId}/comment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      }
    );

    revalidateTag("post"); // Refresh the post cache after comment deletion
    return data;
  } catch (error) {
    console.error("Failed to delete comment", error);
    throw new Error("Failed to delete comment");
  }
};

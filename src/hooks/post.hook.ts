import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addOrUpdateComment,
  createPost,
  deleteComment,
  deletePost,
  getMyPosts,
  updateDecDownvote,
  updateDecUpvote,
  updateIncDownvote,
  updateIncUpvote,
  updatePost,
} from "../services/PostApi";

// Hook to create a post
export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Hook to upvote a post
export const useUpvoteIncPost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["UPVOTE_POST"],
    mutationFn: async (postId) => await updateIncUpvote(postId),
    onSuccess: () => {
      toast.success("Post upvoted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Hook to downvote a post
export const useDownvoteIncPost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DOWNVOTE_POST"],
    mutationFn: async (postId) => await updateIncDownvote(postId),
    onSuccess: () => {
      toast.success("Post downvoted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
// Hook to upvote a post
export const useUpvoteDecPost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["UPVOTE_POST"],
    mutationFn: async (postId) => await updateDecUpvote(postId),
    onSuccess: () => {
      toast.success("Post upvoted undo successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Hook to downvote a post
export const useDownvoteDecPost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DOWNVOTE_POST"],
    mutationFn: async (postId) => await updateDecDownvote(postId),
    onSuccess: () => {
      toast.success("Post downvoted undo successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Hook to update a post
export const useUpdatePost = () => {
  return useMutation<any, Error, { postId: string; formData: FormData }>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ postId, formData }) =>
      await updatePost(postId, formData),
    onSuccess: () => {
      toast.success("Post updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Hook to delete a post
export const useDeletePost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postId) => await deletePost(postId),
    onSuccess: () => {
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Hook to add or update a comment
export const useAddOrUpdateComment = () => {
  return useMutation<
    any,
    Error,
    { postId: string; comment: string; commenter: string }
  >({
    mutationKey: ["ADD_UPDATE_COMMENT"],
    mutationFn: async ({ postId, comment, commenter }) =>
      await addOrUpdateComment(postId, comment, commenter),
    onSuccess: () => {
      toast.success("Comment added/updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateComment = () => {
  return useMutation<
    any,
    Error,
    { postId: string; commenter: string; comment: string }
  >({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async ({ postId, commenter, comment }) =>
      await addOrUpdateComment(postId, commenter, comment),
    onSuccess: () => {
      toast.success("Comment updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
// Hook to delete a comment
export const useDeleteComment = () => {
  return useMutation<any, Error, { postId: string; commentId: string }>({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async ({ postId, commentId }) =>
      await deleteComment(postId, commentId),
    onSuccess: () => {
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMyPosts = () => {
  return useQuery<any, Error>({
    queryKey: ["GET_MY_POSTS"],
    queryFn: async () => await getMyPosts(),
  });
};

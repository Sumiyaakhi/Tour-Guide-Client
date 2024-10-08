"use client";
import React, { useState } from "react";
import { TPost } from "@/src/types";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { Divider } from "@nextui-org/divider";
import ImageGallery from "./ImageGallery";
import { Avatar } from "@nextui-org/avatar";
import CommentsModal from "./CommentsModal";
import { Button } from "@nextui-org/button";
import { FaShare } from "react-icons/fa";
import Swal from "sweetalert2"; // Importing SweetAlert2 directly
import {
  useAddOrUpdateComment,
  useDownvoteDecPost,
  useDownvoteIncPost,
  useUpvoteDecPost,
  useUpvoteIncPost,
} from "@/src/hooks/post.hook";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { LuSendHorizonal } from "react-icons/lu";
import Link from "next/link";

interface PostCardProps {
  post: TPost;
  isAuthenticated: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isAuthenticated }) => {
  const router = useRouter();
  const {
    user,
    title,
    content,
    images,
    comments,
    upvote: initialUpvote = 0,
    downvote: initialDownvote = 0,
  } = post || {};

  const [upvote, setUpvote] = useState<number>(initialUpvote);
  const [downvote, setDownvote] = useState<number>(initialDownvote);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
  const [isDownvoted, setIsDownvoted] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const { mutate: updateIncUpvote } = useUpvoteIncPost();
  const { mutate: updateDecUpvote } = useUpvoteDecPost();
  const { mutate: updateIncDownvote } = useDownvoteIncPost();
  const { mutate: updateDecDownvote } = useDownvoteDecPost();
  const { mutate: addOrUpdateComment } = useAddOrUpdateComment();
  const pathname = usePathname();
  const showLoginAlert = () => {
    const currentPage = pathname;
    Swal.fire({
      title: "Login Required",
      text: "You need to log in to perform this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Log In",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/login?redirect=${currentPage}`);
      }
    });
  };

  const handleUpvote = () => {
    if (!isAuthenticated) {
      showLoginAlert();
      return;
    }

    if (isUpvoted) {
      setUpvote((prev) => prev - 1);
      setIsUpvoted(false);
      updateDecUpvote(post._id);
    } else {
      if (isDownvoted) {
        setDownvote((prev) => prev - 1);
        setIsDownvoted(false);
        updateDecDownvote(post._id);
      }
      setUpvote((prev) => prev + 1);
      setIsUpvoted(true);
      updateIncUpvote(post._id);
    }
  };

  const handleDownvote = () => {
    if (!isAuthenticated) {
      showLoginAlert();
      return;
    }

    if (isDownvoted) {
      setDownvote((prev) => prev - 1);
      setIsDownvoted(false);
      updateDecDownvote(post._id);
    } else {
      if (isUpvoted) {
        setUpvote((prev) => prev - 1);
        setIsUpvoted(false);
        updateDecUpvote(post._id);
      }
      setDownvote((prev) => prev + 1);
      setIsDownvoted(true);
      updateIncDownvote(post._id);
    }
  };

  const handleComment = () => {
    if (!isAuthenticated) {
      showLoginAlert();
      return;
    }

    if (!comment.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Comment cannot be empty!",
      });
      return;
    }

    addOrUpdateComment(
      {
        postId: post._id,
        comment: comment,
        commenter: user._id,
      },
      {
        onSuccess: () => {
          setComment("");
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Comment submitted successfully!",
          });
        },
        onError: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to submit the comment.",
          });
          console.error(error);
        },
      }
    );
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mb-4 font-body">
      {/* Header with user info */}
      <div className="flex justify-between w-full shadow-lg border-2 md:p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Avatar className="cursor-pointer" src={user?.img} />
          <div>
            <h2 className="text-md font-semibold">{user?.name}</h2>
            <p className="text-sm text-gray-700">{user?.email}</p>
          </div>
        </div>

        {/* Dropdown for edit/delete */}
        <div className="relative">
          <HiMiniEllipsisVertical
            className="md:w-6 md:h-8 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => {
                  console.log("Edit post");
                  setDropdownOpen(false);
                }}
              >
                Edit Post
              </button>
              <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post content */}
      <div className="shadow-lg border-2 md:p-4 rounded-lg my-3">
        <div className="my-3">
          <h2 className="text-xl font-bold py-2">{title}</h2>
          <p>{content}</p>
        </div>
        <ImageGallery images={images as string[]} />
      </div>

      {/* Voting and comments section */}
      <div className="flex justify-between items-center w-full shadow-lg border-2 p-2 rounded-lg md:px-6">
        {/* Upvote */}
        <div className="flex gap-2 items-center">
          {isUpvoted ? (
            <AiFillLike
              onClick={handleUpvote}
              className="w-8 h-8 cursor-pointer text-blue-600"
            />
          ) : (
            <AiOutlineLike
              onClick={handleUpvote}
              className="w-8 h-8 cursor-pointer"
            />
          )}
          {upvote > 0 && (
            <h5 className="md:text-xl font-semibold">({upvote})</h5>
          )}
        </div>

        <Divider orientation="vertical" />
        {/* Downvote */}
        <div className="flex gap-2 items-center">
          {isDownvoted ? (
            <AiFillDislike
              onClick={handleDownvote}
              className="w-8 h-8 cursor-pointer text-red-600"
            />
          ) : (
            <AiOutlineDislike
              onClick={handleDownvote}
              className="w-8 h-8 cursor-pointer"
            />
          )}
          {downvote > 0 && (
            <h5 className="md:text-xl font-semibold">({downvote})</h5>
          )}
        </div>

        <Divider orientation="vertical" />
        <div>
          <CommentsModal
            comments={comments ?? []}
            currentUserEmail={user?.email}
            postId={post?._id}
          />
        </div>
        <Divider orientation="vertical" />
        <Link href={`/news-feed/${post._id}`}>
          <Button className="bg-white flex space-x-3 justify-center items-center">
            <h5 className="md:text-xl font-semibold hidden md:block">
              Show Details
            </h5>
            <FaShare className="w-5 h-5 cursor-pointer" />
          </Button>
        </Link>
      </div>

      {/* Comment input */}
      <div className="mt-4 shadow-lg border-2 md:p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Add a Comment:</h4>
        <div className="flex space-x-1">
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type your comment..."
            className="w-full p-2 border rounded-lg resize-none"
          />
          <button onClick={handleComment} className="mt-2">
            <LuSendHorizonal className="md:w-8 md:h-8 text-teal-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

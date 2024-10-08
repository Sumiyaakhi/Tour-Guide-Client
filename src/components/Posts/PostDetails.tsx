"use client";

import { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Divider, Button } from "@nextui-org/react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { motion } from "framer-motion";
import ImageGallery from "./ImageGallery";
import CommentsModal from "./CommentsModal";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  useAddOrUpdateComment,
  useDownvoteDecPost,
  useDownvoteIncPost,
  useUpvoteDecPost,
  useUpvoteIncPost,
} from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";

// Define the PostDetailsProps interface
interface PostDetailsProps {
  post: {
    _id: string;
    title: string;
    content: string;
    images: string[];
    category: string;
    createdAt: Date;

    user: {
      name: string;
      img: string;
      email: string;
    };
    upvote: number;
    downvote: number;
    comments: Array<{
      comment: string;
      commenter: string;
      _id: string;
    }>;
  };
}

const PostDetails: FC<PostDetailsProps> = ({ post }) => {
  const { user } = useUser();
  const isAuthenticated = !!user;
  const {
    title,
    content,
    images,
    comments,
    category,
    upvote: initialUpvote = 0,
    downvote: initialDownvote = 0,
  } = post || {};

  const router = useRouter();
  const pathname = usePathname();
  const [upvote, setUpvote] = useState<number>(initialUpvote);
  const [downvote, setDownvote] = useState<number>(initialDownvote);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
  const [isDownvoted, setIsDownvoted] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { mutate: updateIncUpvote } = useUpvoteIncPost();
  const { mutate: updateDecUpvote } = useUpvoteDecPost();
  const { mutate: updateIncDownvote } = useDownvoteIncPost();
  const { mutate: updateDecDownvote } = useDownvoteDecPost();
  const { mutate: addOrUpdateComment } = useAddOrUpdateComment();

  if (!post) return <div>Loading...</div>;

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
        commenter: user?._id,
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
    <div className="container mx-auto p-6 max-w-7xl ">
      <h1 className="md:text-4xl text-xl font-bold   py-4 text-teal-700">
        Post Details for {title}
      </h1>

      <div className="my-4 md:my-auto flex justify-between">
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold mb-4 text-teal-700">{title}</h1>
            <p className="text-xl">{content}</p>
            <p className="text-xl ">
              <span className="font-bold">Category :</span> {category}
            </p>
          </motion.div>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <Avatar src={user?.img} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-xl font-semibold">{user?.name}</h3>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="">
        <div className="">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full mb-6"
          >
            <ImageGallery images={images} />
          </motion.div>

          {/* Voting Section */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center space-x-4 mb-6"
          >
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
                  postId={post._id}
                />
              </div>
              <Divider orientation="vertical" />
              <Link href={`/news-feed/${post._id}`}>
                <Button className="bg-white flex space-x-3 justify-center items-center border-2 border-gray-300 hover:bg-gray-200 transition duration-150">
                  <FaShare />
                  <span>Share</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Comment Input */}
          {isAuthenticated && (
            <div className="flex items-center space-x-4 mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 p-2 border rounded-md"
                placeholder="Write a comment..."
                rows={2}
              />
              <Button
                onClick={handleComment}
                className="bg-blue-600 text-white"
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

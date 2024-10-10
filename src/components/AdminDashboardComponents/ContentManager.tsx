"use client";

import { TPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React from "react";
import ImageGallery from "../Posts/ImageGallery";
import { Trash, Trash2 } from "lucide-react";
import { deletePost } from "@/src/services/PostApi";
import Swal from "sweetalert2";

const ContentManager = ({ post }: { post: TPost }) => {
  const handleDeletePost = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deletePost(post._id); // Use _id for deletion
        Swal.fire("Deleted!", "Your post has been deleted.", "success"); // Success message
      } catch (error) {
        console.error("Failed to delete the post:", error);
        Swal.fire("Error!", "There was an error deleting your post.", "error"); // Error message
      }
    }
  };

  return (
    <div>
      <Card className="max-w-3xl">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src={post?.user?.img} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {post?.user?.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                {post?.user?.email}
              </h5>
            </div>
          </div>
          <div>
            <Trash2
              className="cursor-pointer text-red-500" // Make the trash icon red
              onClick={handleDeletePost} // Call handleDeletePost on click
            />
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p className="">{post?.content}</p>
          <ImageGallery images={post?.images as string[]} />
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              {post?.upvote}
            </p>
            <p className="text-default-400 text-small">Upvotes</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              {post?.downvote}
            </p>
            <p className="text-default-400 text-small">Downvotes</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentManager;

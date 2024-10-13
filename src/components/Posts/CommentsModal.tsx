"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { TfiComment } from "react-icons/tfi";
import { IComment } from "@/src/types";
import moment from "moment";
import { useDeleteComment, useUpdateComment } from "@/src/hooks/post.hook";
import { toast } from "sonner";
import Image from "next/image";

const CommentsModal = ({
  comments,
  currentUserEmail,
  postId,
}: {
  comments: IComment[];
  currentUserEmail: string;
  postId: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState<IComment | null>(null);
  const [newComment, setNewComment] = useState("");

  const { mutate: updateComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  // console.log(comments);
  const openEditModal = (comment: IComment) => {
    setCommentToEdit(comment);
    setNewComment(comment.comment); // Set initial comment for editing
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCommentToEdit(null);
    setNewComment(""); // Clear the new comment state when closing the modal
  };

  const handleDelete = (commentId: string) => {
    deleteComment(
      { postId, commentId },
      {
        onSuccess: () => {
          // console.log(`Deleted comment with id: ${commentId}`);
          toast.success("Comment deleted successfully!");
        },
        onError: (error: any) => {
          console.error("Error deleting comment: ", error);
        },
      }
    );
  };

  const handleUpdateComment = (commentId: string) => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    // Call the mutation with postId, comment, and commenter (user's email)
    updateComment(
      {
        postId: postId,
        comment: newComment, // Use newComment instead of comment
        commenter: commentId, // Use the current user's email
      },
      {
        onSuccess: () => {
          closeEditModal(); // Close the modal on success
          toast.success("Comment updated successfully!");
        },
        onError: (error: any) => {
          toast.error("Failed to update the comment");
          console.error(error);
        },
      }
    );
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-white flex space-x-1 justify-center items-center"
      >
        <h5 className="md:text-xl font-semibold hidden md:block">Comments</h5>
        <TfiComment className="w-5 h-5 cursor-pointer" />
        {comments?.length > 0 && (
          <h5 className="md:text-xl font-semibold">({comments.length})</h5>
        )}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Comments
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {comments && comments?.length > 0 ? (
                    comments?.map((comment) => (
                      <div
                        key={comment._id}
                        className="flex space-x-4 border-b pb-4"
                      >
                        <Image
                          width={50}
                          height={50}
                          src={comment?.commenter?.img as string}
                          alt={comment?.commenter?.name as string}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="w-full">
                          <h5 className="font-semibold">
                            {comment?.commenter?.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            {moment(comment?.createdAt).fromNow()} |{" "}
                            {comment?.commenter?.address}
                          </p>
                          <p className="text-gray-800">{comment?.comment}</p>

                          {/* Show Edit and Delete buttons only if the user is the commenter */}
                          {comment?.commenter?.email === currentUserEmail && (
                            <div className="flex space-x-2 mt-2">
                              <Button
                                color="primary"
                                size="sm"
                                onPress={() => openEditModal(comment)}
                              >
                                Edit
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                onPress={() => {
                                  if (comment._id) {
                                    handleDelete(comment._id); // Only call handleDelete if comment._id is defined
                                  } else {
                                    console.error("Comment ID is undefined.");
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet. Be the first to comment!</p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Comment Modal */}
      {isEditModalOpen && commentToEdit && (
        <Modal isOpen={isEditModalOpen} onOpenChange={closeEditModal}>
          <ModalContent>
            <>
              <ModalHeader>Edit Comment</ModalHeader>
              <ModalBody>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closeEditModal}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() =>
                    commentToEdit?._id && handleUpdateComment(commentToEdit._id)
                  }
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CommentsModal;

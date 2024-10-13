"use client";

import React, { useState } from "react";
import ProfileUpdate from "../Profile/ProfileUpdate";
import { Button } from "@nextui-org/button";
import { MdVerified } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { Avatar } from "@nextui-org/avatar";
import { useUser } from "@/src/context/user.provider";
import Swal from "sweetalert2";
import { verifyUser } from "@/src/services/UserApi";
import { TPost } from "@/src/types";
import { useGetMyPosts } from "@/src/hooks/post.hook";

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>();

  // Fetch user's posts
  const { data, isLoading, isError } = useGetMyPosts();
  const myPosts = data?.data || [];
  console.log("my all posts daata", myPosts);
  // Get total upvotes for the user's posts
  // const getTotalUpvotes = (myPosts: TPost[]) => {
  //   return myPosts.reduce((total, post) => total + (post.upvote || 0), 0);
  // };
  const totalUpvotes = 10;
  // const totalUpvotes = getTotalUpvotes(myPosts);

  // Verify user logic
  const handleVerify = async () => {
    try {
      setLoading(true); // Optional: Show loading state
      const token = user?.token; // Adjust this line to retrieve the token correctly
      const res = await verifyUser(user?._id as string, token); // Pass both userId and token
      window.location.href = res.data.paymentSession.paymentUrl;
    } catch (error) {
      console.error("Error verifying user", error);
      Swal.fire("Error", "Failed to verify user!", "error");
    } finally {
      setLoading(false); // Reset loading state after completion
    }
  };

  const isVerified = user?.verified || false;

  return (
    <div>
      <div className="w-full">
        <div className="w-full max-w-4xl mx-auto text-teal-800">
          <div className="rounded-lg shadow-lg p-6">
            {/* Profile Picture */}
            <div className="flex justify-center my-4">
              <Avatar
                src={user?.img} // Fallback image
                className="md:w-64 md:h-64 rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="pt-4 md:pt-12 flex gap-2 justify-center flex-col items-center">
              {/* User Info */}
              {user ? (
                <>
                  <div className="flex gap-2 justify-center items-center">
                    <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                    {isVerified && (
                      <div className="flex gap-1">
                        <MdVerified className="w-6 h-6 text-blue-700 ml-2" />
                        <BsStars className="w-5 h-5 text-yellow-400 ml-1" />
                      </div>
                    )}
                  </div>
                  <p className="">{user?.email || "No email available"}</p>
                  <p className="mt-2">{user?.bio || "No bio available"}</p>
                </>
              ) : (
                <p className="">No user data available</p>
              )}

              {/* Follow and Verify Buttons */}
              <div className="flex justify-between gap-4 mt-4">
                {totalUpvotes > 0 && (
                  <Button
                    className="font-bold btn-primary"
                    onClick={handleVerify}
                    disabled={isVerified || loading} // Disable button if verified or loading
                  >
                    {loading
                      ? "Processing..."
                      : isVerified
                        ? "Verified"
                        : "Verify Profile"}
                  </Button>
                )}
                {/* Edit Profile Button */}
                <ProfileUpdate />
              </div>

              {/* Followers and followings count */}
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-7 font-bold py-5">
                <h3>Followers {user?.followers?.length || 0}</h3>
                <h3>Followings {user?.followings?.length || 0}</h3>
              </div>

              {/* Posts Section */}
              <div className="mt-4">
                {isLoading ? (
                  <p>Loading your posts...</p>
                ) : isError ? (
                  <p>Error loading posts!</p>
                ) : myPosts.length > 0 ? (
                  myPosts.map((post: TPost) => (
                    <div key={post._id} className="p-4 border-b">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <p>{post.content}</p>
                      <p>Upvotes: {post.upvote}</p>
                    </div>
                  ))
                ) : (
                  <p>No posts available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

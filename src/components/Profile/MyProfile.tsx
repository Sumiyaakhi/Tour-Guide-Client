"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@nextui-org/button";
import { useUser } from "@/src/context/user.provider";
import { Avatar } from "@nextui-org/avatar";
import { MdVerified } from "react-icons/md";
import { BsStars } from "react-icons/bs"; // For premium badge icon
import { followUser, verifyUser } from "@/src/services/UserApi";
import { IUser, TPost } from "@/src/types";
import ProfileUpdate from "./ProfileUpdate";
import TabsComponent from "./TabsComponent";

interface MyProfileProps {
  myPosts: TPost[];
  allUsers: IUser[];
}
interface TUser {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  verified: boolean;
  followings: string[];
  followers: string[];
  img?: string;
  [key: string]: any; // Allow other dynamic fields if needed
}

const MyProfile: React.FC<MyProfileProps> = ({ myPosts, allUsers }) => {
  const { user, setUser, token } = useUser(); // Make sure token is retrieved from context
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>();

  // Get total upvotes for the user's posts
  const getTotalUpvotes = (myPosts: TPost[]) => {
    return myPosts.reduce((total, post) => total + (post.upvote || 0), 0);
  };
  const totalUpvotes = getTotalUpvotes(myPosts);

  // Get all users except the current user
  const allUsersExceptCurrent = allUsers.filter(
    (Tuser) => Tuser._id !== user?._id
  );

  // Follow/Unfollow logic
  const handleToggleFollowUser = async (targetUserId: string) => {
    try {
      if (!token) throw new Error("User not authenticated");
      setLoading(true);
      const response = await followUser(
        targetUserId,
        user?._id as string,
        token
      );
      const { currentUser, message } = response;

      Swal.fire("Success", message, "success");
    } catch (error) {
      console.error("Error toggling follow/unfollow", error);
      Swal.fire("Error", "Failed to follow/unfollow!", "error");
    } finally {
      setLoading(false);
    }
  };

  // Verify user logic
  const handleVerify = async () => {
    try {
      if (!token) throw new Error("User not authenticated");
      const res = await verifyUser(user?._id as string, token);
      window.location.href = res.data.paymentSession.paymentUrl;
    } catch (error) {
      console.error("Error verifying user", error);
      Swal.fire("Error", "Failed to verify user!", "error");
    }
  };

  // Check if user is verified
  const isVerified = user?.verified || false;

  return (
    <div className="">
      <div className="bg-black w-full pt-24">
        {/* Profile Card - fixed for md and larger screens */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2">
            {/* Profile Picture */}
            <div className="flex justify-center my-4">
              <Avatar
                src={imagePreview || user?.img || "/default-avatar.png"} // Fallback image
                className="md:w-64 md:h-64 rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="pt-4 md:pt-12 flex gap-2 justify-center flex-col items-center">
              {/* User Info */}
              {user ? (
                <>
                  <div className="flex gap-2 justify-center items-center">
                    <h1 className="text-3xl text-white font-bold mb-2">
                      {user?.name}
                    </h1>
                    {isVerified && (
                      <div className="flex gap-1">
                        <MdVerified className="w-6 h-6 text-blue-700 ml-2" />
                        <BsStars className="w-5 h-5 text-yellow-400 ml-1" />
                      </div>
                    )}
                  </div>
                  <p className="text-white">
                    {user?.email || "No email available"}
                  </p>
                  <p className="text-white mt-2">
                    {user?.bio || "No bio available"}
                  </p>
                </>
              ) : (
                <p className="text-white">No user data available</p>
              )}

              {/* Follow and Verify Buttons */}
              <div className="flex justify-between gap-4 mt-4 text-white">
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
              <div className="grid grid-cols-1 text-white md:grid-cols-2 md:gap-4 lg:gap-7 font-bold py-5">
                <h3>Followers {user?.followers?.length || 0}</h3>
                <h3>Followings {user?.followings?.length || 0}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab items container */}
      <TabsComponent
        myPosts={myPosts}
        allUsersExceptCurrent={allUsersExceptCurrent}
        user={user as IUser}
        handleToggleFollowUser={handleToggleFollowUser}
      />
    </div>
  );
};

export default MyProfile;

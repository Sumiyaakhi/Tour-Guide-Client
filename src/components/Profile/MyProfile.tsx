"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@nextui-org/button";
import { useUser } from "@/src/context/user.provider";
import { Avatar } from "@nextui-org/avatar";
import { MdVerified } from "react-icons/md";
import { followUser, verifyUser } from "@/src/services/UserApi";
import { IUser, TPost } from "@/src/types";
import ProfileUpdate from "./ProfileUpdate";
import TabsComponent from "./TabsComponent";

interface MyProfileProps {
  myPosts: TPost[];
  allUsers: IUser[];
}

const MyProfile: React.FC<MyProfileProps> = ({ myPosts, allUsers }) => {
  const { user, setUser } = useUser();
  console.log("user data", user);
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string>();
  const [isVerified, setIsVerified] = useState(user?.verified);
  const getTotalUpvotes = (myPosts: TPost[]) => {
    return myPosts.reduce((total, post) => total + (post.upvote || 0), 0);
  };
  const totalUpvotes = getTotalUpvotes(myPosts);
  const allUsersExceptCurrent = allUsers.filter(
    (Tuser) => Tuser._id !== user?._id
  );
  console.log("Total Upvotes:", totalUpvotes);

  // Follow/Unfollow logic
  const handleToggleFollowUser = async (targetUserId: string) => {
    try {
      setLoading(true);

      const response = await followUser(targetUserId, user?._id as string);
      const { currentUser, message } = response;

      setUser((prevUser) => {
        return {
          ...prevUser,
          followings: currentUser.followings,
        };
      });

      Swal.fire("Success", message, "success");
    } catch (error) {
      console.error("Error toggling follow/unfollow", error);
      Swal.fire("Error", "Failed to follow/unfollow!", "error");
    } finally {
      setLoading(false);
    }
  };

  // Verify logic
  const handleVerify = async () => {
    try {
      await verifyUser(user?._id as string);
      setIsVerified(true);
      Swal.fire("Success", "User verified successfully!", "success");
    } catch (error) {
      console.error("Error verifying user", error);
      Swal.fire("Error", "Failed to verify user!", "error");
    }
  };

  return (
    <div className="">
      <div className="bg-black w-full  pt-24">
        {/* Profile Card - fixed for md and larger screens */}
        <div className="w-full   max-w-4xl mx-auto">
          <div className=" rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 ">
            {/* Profile Picture */}
            <div className=" flex justify-center my-4">
              <Avatar
                src={imagePreview || user?.img}
                className="md:w-64 md:h-64 rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="pt-4 md:pt-12 flex gap-2 justify-center flex-col items-center">
              {/* User Info */}
              <div className="text-center">
                <div className="flex gap-2 justify-center items-center">
                  <h1 className="text-3xl text-white font-bold mb-2">
                    {user?.name}
                  </h1>
                  {user?.verified === true ? (
                    <MdVerified className="w-6 h-6 text-blue-700" />
                  ) : (
                    <></>
                  )}
                </div>
                <p className="text-white">
                  {user?.email || "No email available"}
                </p>
                <p className="text-white mt-2">
                  {user?.bio || "No bio available"}
                </p>
              </div>

              {/* Follow and Verify Buttons */}
              <div className="flex justify-center gap-4 mt-4 text-white">
                <Button className="font-bold btn-primary">
                  {user?.followings ? "Unfollow" : "Follow"}
                </Button>
                <Button
                  className="font-bold btn-primary"
                  onClick={handleVerify}
                  disabled={isVerified}
                >
                  {isVerified ? "Verified" : "Verify Profile"}
                </Button>
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

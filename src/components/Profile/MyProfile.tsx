"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@nextui-org/button";
import { useUser } from "@/src/context/user.provider"; // Assuming there's a User Context
import { Avatar } from "@nextui-org/avatar";
import { CiEdit } from "react-icons/ci";
import { MdMovieEdit, MdVerified } from "react-icons/md";
import { useDisclosure } from "@nextui-org/modal";
import { followUser, unfollowUser, verifyUser } from "@/src/services/UserApi";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { TPost } from "@/src/types";
import PostCard from "../Posts/PostCard";
import ProfileUpdate from "./ProfileUpdate";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import {
  Airplay,
  GalleryVerticalIcon,
  HandHeart,
  TvMinimal,
  VideoIcon,
} from "lucide-react";
import { HeartFilledIcon } from "../icons";

interface MyProfileProps {
  myPosts: TPost[];
}

const MyProfile: React.FC<MyProfileProps> = ({ myPosts }) => {
  const { user, setUser } = useUser(); // Get user details from context
  console.log("user data", user);
  const [imagePreview, setImagePreview] = useState<string>();
  const [isVerified, setIsVerified] = useState(user?.verified);
  const getTotalUpvotes = (myPosts: TPost[]) => {
    return myPosts.reduce((total, post) => total + (post.upvote || 0), 0);
  };
  const totalUpvotes = getTotalUpvotes(myPosts);
  console.log("Total Upvotes:", totalUpvotes);
  // Follow/Unfollow logic
  const handleFollowUnfollow = async () => {
    // try {
    //   if (user?.followings) {
    //     await unfollowUser(user._id);
    //     setUser({ ...user, followings: false });
    //     Swal.fire("Success", "Unfollowed successfully!", "success");
    //   } else {
    //     await followUser(user?._id);
    //     setUser({ ...user, followings: true });
    //     Swal.fire("Success", "Followed successfully!", "success");
    //   }
    // } catch (error) {
    //   console.error("Error following/unfollowing", error);
    //   Swal.fire("Error", "Failed to follow/unfollow!", "error");
    // }
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
                <Button
                  className="font-bold btn-primary"
                  onClick={handleFollowUnfollow}
                >
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
      <div className="flex w-full flex-col max-w-4xl mx-auto">
        <Tabs aria-label="Options" className="">
          <Tab
            key="posts"
            title={
              <div className="flex items-center space-x-2">
                <TvMinimal />
                <span>My Posts</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                {/* Posts Section - takes remaining width */}
                <div className="w-full  max-w-5xl mx-auto flex flex-col">
                  <h1 className="md:text-2xl lg:text-3xl text-green-500 underline font-bold">
                    My Posts
                  </h1>
                  {myPosts.length === 0 ? (
                    <p>No posts available</p>
                  ) : (
                    myPosts.map((post) => (
                      <PostCard
                        key={post._id}
                        post={post}
                        isAuthenticated={true}
                      />
                    ))
                  )}
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                <HandHeart />
                <span>Followers</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                {user?.followers?.length ? (
                  user.followers.map((follower, index) => (
                    <div
                      key={index}
                      className="follower-item flex items-center space-x-4 mb-4"
                    >
                      {/* Follower Image */}
                      <img
                        src={follower?.img || "/default-avatar.png"}
                        alt={`${follower?.name}'s profile`}
                        className="w-12 h-12 rounded-full"
                      />
                      {/* Follower Details */}
                      <div>
                        <p className="text-lg font-semibold">
                          {follower?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {follower?.email}
                        </p>
                        {/* Display the time from createdAt, fallback to current date if undefined */}
                        <p className="text-xs text-gray-400">
                          Followed:{" "}
                          {follower?.createdAt
                            ? new Date(follower.createdAt).toLocaleString()
                            : "Unknown date"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No followers found.</p>
                )}
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <HeartFilledIcon />
                <span>Followings</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                {user?.followings?.length ? (
                  user.followings.map((following, index) => (
                    <div
                      key={index}
                      className="follower-item flex items-center space-x-4 mb-4"
                    >
                      {/* Follower Image */}
                      <img
                        src={following?.img || "/default-avatar.png"}
                        alt={`${following?.name}'s profile`}
                        className="w-12 h-12 rounded-full"
                      />
                      {/* Follower Details */}
                      <div>
                        <p className="text-lg font-semibold">
                          {following?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {following?.email}
                        </p>
                        {/* Display the time from createdAt, fallback to current date if undefined */}
                        <p className="text-xs text-gray-400">
                          Followed:{" "}
                          {following?.createdAt
                            ? new Date(following.createdAt).toLocaleString()
                            : "Unknown date"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No followers found.</p>
                )}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default MyProfile;

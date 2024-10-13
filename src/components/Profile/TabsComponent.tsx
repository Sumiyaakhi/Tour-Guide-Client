"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { HandHeart, TvMinimal, User } from "lucide-react";
import React, { useState } from "react";
import PostCard from "../Posts/PostCard";
import { HeartFilledIcon } from "../icons";
import { IUser, TPost } from "@/src/types";
import Image from "next/image";

interface TabsComponentProps {
  myPosts: TPost[];
  allUsersExceptCurrent: IUser[];
  user: IUser;
  handleToggleFollowUser: any;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  myPosts,
  allUsersExceptCurrent,
  user,
  handleToggleFollowUser,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex w-full flex-col max-w-4xl mx-auto">
      <Tabs aria-label="Options" className="py-2 text-xl">
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
                      key={post?._id}
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
                    <Image
                      src={follower?.img}
                      alt={`${follower?.name}'s profile`}
                      className="w-12 h-12 rounded-full"
                      width={50}
                      height={50}
                    />
                    {/* Follower Details */}
                    <div>
                      <p className="text-lg font-semibold">{follower?.name}</p>
                      <p className="text-sm text-gray-500">{follower?.email}</p>
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
          key="followings"
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
                    <Image
                      src={following?.img}
                      alt={`${following?.name}'s profile`}
                      className="w-12 h-12 rounded-full"
                      width={50}
                      height={50}
                    />
                    {/* Follower Details */}
                    <div>
                      <p className="text-lg font-semibold">{following?.name}</p>
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
        <Tab
          key="user"
          title={
            <div className="flex items-center space-x-2">
              <User />
              <span>Others user</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              {allUsersExceptCurrent?.length ? (
                allUsersExceptCurrent.map((Tuser: IUser, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between md:mx-8 my-2"
                  >
                    <div className="follower-item flex items-center gap-4 mb-4">
                      {/* Follower Image */}
                      <Image
                        src={Tuser?.img as string}
                        alt={`${Tuser?.name}'s profile`}
                        className="w-12 h-12 rounded-full"
                        width={50}
                        height={50}
                      />
                      {/* Follower Details */}
                      <div>
                        <p className="text-lg font-semibold">{Tuser?.name}</p>
                        <p className="text-sm text-gray-500">{Tuser?.email}</p>
                      </div>
                    </div>
                    {/* Follow/Unfollow Button */}
                    <Button
                      className="btn-primary"
                      onClick={() => handleToggleFollowUser(Tuser._id)} // Pass the full Tuser object
                      disabled={loading}
                    >
                      {user?.followings?.some((f) => f._id === Tuser._id)
                        ? "Unfollow"
                        : "Follow"}
                    </Button>
                  </div>
                ))
              ) : (
                <p>No user found.</p>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsComponent;

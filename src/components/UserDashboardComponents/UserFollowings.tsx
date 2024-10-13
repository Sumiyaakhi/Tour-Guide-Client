"use client";

import { useUser } from "@/src/context/user.provider";
import { followUser } from "@/src/services/UserApi";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import React, { useState } from "react";
import Swal from "sweetalert2";

const UserFollowings = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const userFollowings = user?.followings;

  const handleToggleFollowUser = async (targetUserId: string) => {
    // Ensure you have access to the token
    const token = user?.token; // Make sure your user context provides the token

    if (!token) {
      Swal.fire("Error", "User token is missing!", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await followUser(
        targetUserId,
        user?._id as string,
        token
      ); // Pass the token here
      const { currentUser, message } = response;

      Swal.fire("Success", message, "success");
      setUser(currentUser); // Update the user context with the current user
    } catch (error) {
      console.error("Error toggling follow/unfollow", error);
      Swal.fire("Error", "Failed to follow/unfollow!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto gap-6 grid grid-cols-1 ">
      <p className="text-xl text-center font-bold text-teal-500">
        Total Followings: {userFollowings?.length} person
      </p>
      {userFollowings?.map((following) => (
        <Card
          key={following._id}
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
          shadow="sm"
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-12 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <Image
                  alt="User Image"
                  className="object-cover"
                  height={200}
                  src={following.img}
                  width={200}
                />
              </div>

              <div className="flex flex-col col-span-6 md:col-span-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <h3 className="font-semibold md:text-xl text-foreground/90">
                      {following.name}
                    </h3>
                    <p className="text-small text-foreground/80">
                      {following.email}
                    </p>
                    <h1 className="text-large font-medium mt-2">
                      {following.address}
                    </h1>
                    <p className="text-xs text-gray-400">
                      Followed:
                      {following?.createdAt
                        ? new Date(following.createdAt).toLocaleString()
                        : "Unknown date"}
                    </p>
                    <Button
                      className="btn-primary my-5"
                      onClick={() => handleToggleFollowUser(following?._id)} // Pass the following user's ID
                      disabled={loading}
                    >
                      {user?.followings?.some((f) => f._id === following._id)
                        ? "Unfollow"
                        : "Follow"}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col mt-3 gap-1"></div>

                <div className="flex w-full items-center justify-center"></div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default UserFollowings;

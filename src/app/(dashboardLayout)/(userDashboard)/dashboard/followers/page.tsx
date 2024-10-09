"use server";

import UserFollowers from "@/src/components/UserDashboardComponents/UserFollowers";
import React from "react";

const UserFollowersPage = () => {
  return (
    <div>
      <h1 className="text-teal-600 text-center text-3xl my-5 font-bold">
        My Followers
      </h1>
      <UserFollowers />
    </div>
  );
};

export default UserFollowersPage;

"use server";

import UserFollowings from "@/src/components/UserDashboardComponents/UserFollowings";
import React from "react";

const UserFollowingsPage = () => {
  return (
    <div>
      <h1 className="text-teal-600 text-center text-3xl my-5 font-bold">
        My Followings
      </h1>
      <UserFollowings />
    </div>
  );
};

export default UserFollowingsPage;

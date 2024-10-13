"use client";

import React, { useEffect, useState } from "react";
import UserProfile from "@/src/components/UserDashboardComponents/UserProfile";
import { getMyPosts } from "@/src/services/PostApi";
import { getCurrentUser } from "@/src/services/AuthService"; // Assuming you have this service for fetching user info

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser(); // Fetch the current user's information
        if (!currentUser) {
          setError("User not authenticated.");
          return;
        }
        setUser(currentUser);

        const posts = await getMyPosts(); // Fetch the user's posts
        setMyPosts(posts);
      } catch (err) {
        console.error("Error fetching user data", err);
        setError("Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <UserProfile myPosts={myPosts} />
    </div>
  );
};

export default UserProfilePage;

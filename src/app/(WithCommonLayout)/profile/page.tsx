"use server";

import MyProfile from "@/src/components/Profile/MyProfile";
import axiosInstance from "@/src/lib/AxiosInstance";
import { getMyPosts } from "@/src/services/PostApi";

const ProfilePage = async () => {
  try {
    // Fetching the posts on the server side
    const { data: myPosts } = await getMyPosts();
    const res: any = await axiosInstance.get(`/auth/users`);
    // console.log("my post data", myPosts); // Log the posts to check if they are being fetched
    const allUsers = res.data.data;
    // console.log("all user data", data);

    return (
      <div>
        {/* Passing the fetched posts as props to MyProfile */}
        <MyProfile myPosts={myPosts} allUsers={allUsers} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts", error);
    return <p>Error loading profile</p>;
  }
};

export default ProfilePage;

"use server";

import MyProfile from "@/src/components/Profile/MyProfile";
import { getMyPosts } from "@/src/services/PostApi";

const ProfilePage = async () => {
  try {
    // Fetching the posts on the server side
    const { data: myPosts } = await getMyPosts();

    // console.log("my post data", myPosts); // Log the posts to check if they are being fetched

    return (
      <div>
        {/* Passing the fetched posts as props to MyProfile */}
        <MyProfile myPosts={myPosts} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts", error);
    return <p>Error loading profile</p>;
  }
};

export default ProfilePage;

import MyProfile from "@/src/components/Profile/MyProfile";
import axiosInstance from "@/src/lib/AxiosInstance";

const ProfilePage = async () => {
  try {
    const res = await axiosInstance.get(`/auth/users`);
    const allUsers = res.data.data;

    return (
      <div>
        {/* Passing the fetched posts as props to MyProfile */}
        <MyProfile allUsers={allUsers} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts", error);
    return <p>Error loading profile</p>;
  }
};

export default ProfilePage;

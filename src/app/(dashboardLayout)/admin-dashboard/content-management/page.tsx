import ContentManager from "@/src/components/AdminDashboardComponents/ContentManager";
import { getAllPosts } from "@/src/services/PostApi";
import { TPost } from "@/src/types";
import React from "react";

const ContentmanagerPage = async () => {
  //   // Await the result of the async function
  const { data: posts } = await getAllPosts();

  return (
    <div className="m-5">
      <h1 className="text-2xl md:text-3xl font-bold py-3">Post Manager</h1>
      <h3 className="text-xl md:text-2xl font-bold mb-3">
        Total Post: {posts?.length}
      </h3>
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 mx-4 md:mx-8 gap-6">
          {posts.map((post: TPost, index: number) => (
            <ContentManager key={index} post={post} />
          ))}
        </div>
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
};

export default ContentmanagerPage;

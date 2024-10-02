"use client";

import { useState } from "react";
import { Post } from "@/src/types";
import { PostModal } from "./PostModal";

type Props = {
  posts: Post[];
};

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const posts = [];
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Travel Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            {post.isPremium && <span className="text-red-500">Premium</span>}
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg"
      >
        Create Post
      </button>

      {/* Modal for creating/editing posts */}
      {isModalOpen && <PostModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const posts = await fetchPosts(); // Fetch posts from the backend
//   return {
//     props: {
//       posts,
//     },
//   };
// };

export default Posts;

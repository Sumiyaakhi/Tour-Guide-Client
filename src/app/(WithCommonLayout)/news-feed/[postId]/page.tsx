"use server";

import PostDetails from "@/src/components/Posts/PostDetails";
import axiosInstance from "@/src/lib/AxiosInstance";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PostDetailPage = async ({ params }: { params: { postId: string } }) => {
  //fetch with filter parameterd

  const res: any = await axiosInstance.get(`/post/${params.postId}`, {
    // : "no-store",
    // next: {},
  });

  const data = res.data.data;
  console.log(data);

  return (
    <div className="mt-24">
      <PostDetails post={data} />
    </div>
  );
};

export default PostDetailPage;

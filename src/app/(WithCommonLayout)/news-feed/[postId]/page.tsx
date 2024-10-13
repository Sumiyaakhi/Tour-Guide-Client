"use server";

import PostDetails from "@/src/components/Posts/PostDetails";
import axiosInstance from "@/src/lib/AxiosInstance";

const PostDetailPage = async ({ params }: { params: { postId: string } }) => {
  const res: any = await axiosInstance.get(`/post/${params.postId}`, {
    // : "no-store",
    // next: {},
  });

  const data = res.data.data;

  return (
    <div className="mt-20">
      <PostDetails post={data} />
    </div>
  );
};

export default PostDetailPage;

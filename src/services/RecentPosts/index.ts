import envConfig from "@/src/config/envConfig";

export const getRecentPosts = async (page: number, limit: number) => {
  const fetchOption: RequestInit = {
    next: {
      tags: ["posts"],
    },
    cache: "no-store" as RequestCache, // Ensure it's properly typed
  };

  const res = await fetch(
    `${envConfig.baseApi}/post?sort=-createdAt&page=${page}&limit=${limit}`,
    fetchOption
  );

  return res.json();
};

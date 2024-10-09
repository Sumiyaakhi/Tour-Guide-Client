import envConfig from "@/src/config/envConfig";

interface SearchParams {
  title?: string;
  content?: string;
  category?: string;
  user?: string;
}

export const getRecentPosts = async (
  page: number,
  limit: number,
  searchParams: SearchParams = {}
) => {
  const fetchOption: RequestInit = {
    next: {
      tags: ["posts"],
    },
    cache: "no-store" as RequestCache, // Ensure it's properly typed
  };

  // Initialize URLSearchParams to dynamically add query parameters
  const params = new URLSearchParams({
    sort: "-createdAt",
    page: page.toString(),
    limit: limit.toString(),
  });

  // Add search filters if they exist
  if (searchParams.title) {
    params.append("title", searchParams.title);
  }
  if (searchParams.content) {
    params.append("content", searchParams.content);
  }
  if (searchParams.category) {
    params.append("category", searchParams.category);
  }
  if (searchParams.user) {
    params.append("user", searchParams.user);
  }

  // Construct the full URL with query parameters
  const url = `${envConfig.baseApi}/post?${params.toString()}`;

  const res = await fetch(url, fetchOption);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

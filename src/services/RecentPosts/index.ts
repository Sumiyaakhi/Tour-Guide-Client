import envConfig from "@/src/config/envConfig";

export const getRecentPosts = async () => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/post?sort=-createdAt`,
    fetchOption
  );

  return res.json();
};

export const getAllUsers = async () => {
  const res = await fetch(`${envConfig.baseApi}/auth/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};

"use client";

import React, { useState, useMemo, useEffect } from "react";
import { TPost } from "@/src/types";
import PostCard from "./PostCard";
import { useUser } from "@/src/context/user.provider";
import "react-modern-drawer/dist/index.css";
import InfiniteScroll from "react-infinite-scroll-component";

interface PostProps {
  posts: TPost[];
  categories: string[];
  userNames: string[];
}

const Post = ({ posts, categories, userNames }: PostProps) => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [userFilter, setUserFilter] = useState<string>("");
  const [sortByUpvotes, setSortByUpvotes] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedPosts, setPaginatedPosts] = useState<TPost[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isAuthenticated = !!user;
  const postsPerPage = 5;

  // Initialize paginated posts
  useEffect(() => {
    setPaginatedPosts(posts.slice(0, postsPerPage)); // Load the first page
    setCurrentPage(1); // Reset current page to 1
  }, [posts]);

  // Function to load more posts
  const loadMorePosts = () => {
    const start = currentPage * postsPerPage;
    const newPosts = posts.slice(start, start + postsPerPage);
    setPaginatedPosts((prevPosts) => [...prevPosts, ...newPosts]);

    setHasMore(newPosts.length === postsPerPage); // No more posts if loaded fewer
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = paginatedPosts;

    if (categoryFilter) {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    if (userFilter) {
      filtered = filtered.filter((post) => post.user?.name === userFilter);
    }

    if (sortByUpvotes) {
      filtered = filtered.sort((a, b) => (b.upvote || 0) - (a.upvote || 0));
    }

    return filtered;
  }, [paginatedPosts, categoryFilter, userFilter, sortByUpvotes]);

  return (
    <div className="relative">
      <div className="gap-6">
        <div>
          <div className="flex-grow mx-auto mt-16 md:mt-24 w-full md:max-w-5xl">
            <InfiniteScroll
              dataLength={filteredPosts.length}
              next={loadMorePosts}
              hasMore={hasMore}
              loader={
                <p className="text-xl md:text-3xl text-teal-700">
                  Loading more posts...
                </p>
              }
              endMessage={
                <p className="text-xl md:text-3xl text-teal-700">
                  No more posts to load.
                </p>
              }
            >
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post: TPost, index) => (
                  <PostCard
                    key={index}
                    post={post}
                    isAuthenticated={isAuthenticated}
                  />
                ))
              ) : (
                <p className="text-xl md:text-3xl text-center font-bold">
                  No posts found matching your criteria.
                </p>
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

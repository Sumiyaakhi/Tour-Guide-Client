"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { IUser, TPost } from "@/src/types";
import PostCard from "./PostCard";
import { useUser } from "@/src/context/user.provider";
import FilterBar from "./FilterBar";
import { FaSearch } from "react-icons/fa";
import { Input } from "@nextui-org/input";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css"; // Import styles for the drawer
import { FaFilter } from "react-icons/fa"; // Add an icon for the filter button

const Post = ({ posts }: { posts: TPost[] }) => {
  const { user } = useUser(); // Access the user context
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [sortByUpvotes, setSortByUpvotes] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedPosts, setPaginatedPosts] = useState<TPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer open/close
  const observerRef = useRef<HTMLDivElement>(null); // Ref to track the observer

  const isAuthenticated = !!user;
  const postsPerPage = 10;

  // Load initial posts on component mount
  useEffect(() => {
    loadMorePosts();
  }, [posts]);

  // Unique categories and users for filter dropdowns
  const categories = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.category)));
  }, [posts]);

  const users = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.user?.name)));
  }, [posts]);

  // Function to load more posts (paginated)
  const loadMorePosts = useCallback(() => {
    if (loading) return;
    setLoading(true);
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const newPosts = posts.slice(start, end);

    setPaginatedPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setCurrentPage((prevPage) => prevPage + 1);
    setLoading(false);
  }, [loading, currentPage, posts]);

  // Filter, search, and sort logic
  const filteredPosts = useMemo(() => {
    let filtered = paginatedPosts;

    // Search by title or content
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    // Filter by user
    if (userFilter) {
      filtered = filtered.filter((post) => post.user?.name === userFilter);
    }

    // Sort by upvote count if needed
    if (sortByUpvotes) {
      filtered = filtered.sort((a, b) => (b.upvote || 0) - (a.upvote || 0));
    }

    return filtered;
  }, [paginatedPosts, searchTerm, categoryFilter, userFilter, sortByUpvotes]);

  // Infinite scroll logic with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadMorePosts]);

  // Toggle the drawer for small devices
  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  return (
    <div className="relative md:mt-24">
      {/* Main Content Area */}
      <div className=" gap-6">
        {/* Fixed Search Bar */}
        <div>
          <div className="fixed top-16 md:top-[88px] left-0 right-0 p-4 bg-white w-full shadow-md z-10 md:max-w-[720px] mx-auto flex items-center">
            <FaSearch className="absolute left-7 w-5 h-5 top-6 text-gray-500" />
            <Input
              type="text"
              placeholder="Search posts by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border border-gray-300 rounded w-full"
            />
            {/* Filter Button for Small Devices */}
            <div className="flex gap-1 ml-3 px-4 py-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-white rounded lg:hidden">
              <button onClick={toggleDrawer} className="">
                <FaFilter className="inline mr-2" />
              </button>
              <p>Filters</p>
            </div>
            <button
              onClick={() => {
                console.log("Searching for:", searchTerm);
              }}
              className="ml-3 px-4 py-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-white rounded"
            >
              Search
            </button>
          </div>
          {/* Display Posts */}
          <div className="flex-grow mx-auto my-3 w-full md:max-w-[720px]  mt-36">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post: TPost, index) => (
                <PostCard
                  key={index}
                  post={post}
                  isAuthenticated={isAuthenticated}
                />
              ))
            ) : (
              <p>No posts found matching your criteria.</p>
            )}
            {/* Loading more posts */}
            {loading && <p>Loading more posts...</p>}
            <div ref={observerRef} className="h-10" />
          </div>
        </div>

        {/* Drawer for FilterBar (Small Devices) */}
        <Drawer
          open={isDrawerOpen}
          onClose={toggleDrawer}
          direction="left"
          className="p-4 "
          size={280}
        >
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
            sortByUpvotes={sortByUpvotes}
            setSortByUpvotes={setSortByUpvotes}
            categories={categories}
            user={user as IUser}
          />
        </Drawer>

        {/* Fixed Category Filter Container on Large Devices */}
        <div className="hidden w-1/5 md:fixed left-0 top-20 lg:block">
          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
            sortByUpvotes={sortByUpvotes}
            setSortByUpvotes={setSortByUpvotes}
            categories={categories}
            user={user as IUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;

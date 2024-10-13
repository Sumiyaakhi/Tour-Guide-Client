"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import useDebounce from "@/src/hooks/debounce.hook";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { PostModal } from "./PostModal";
import { useUser } from "@/src/context/user.provider";
import Swal from "sweetalert2";
import { TPost } from "@/src/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSearchItems } from "@/src/hooks/search.hook";

// Replace with your actual post data
const posts: TPost[] = [];

const Filtering = ({
  categories,
  userNames,
  userIds,
}: {
  categories: string[];
  userNames: string[];
  userIds: string[];
}) => {
  const { user } = useUser();
  const { watch, register, handleSubmit } = useForm();
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [userFilter, setUserFilter] = useState<string>("");
  const [sortByUpvotes, setSortByUpvotes] = useState<boolean | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: handleSearch, data, isPending, isSuccess } = useSearchItems();
  const [searchResults, setSearchResults] = useState<[]>([]);

  const isAuthenticated = !!user;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const showLoginAlert = () => {
    const currentPage = pathname;
    Swal.fire({
      title: "Login Required",
      text: "You need to log in to perform this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Log In",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/login?redirect=${currentPage}`);
      }
    });
  };

  const handleCreatePostClick = () => {
    if (!isAuthenticated) {
      showLoginAlert();
    } else {
      onOpen();
    }
  };

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const searchTerm = useDebounce(watch("search"), 500);

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      updateSearchParams("search", "");
    } else if (!isPending && isSuccess && data) {
      setSearchResults(data?.data?.hits ?? []);
    }
  }, [isPending, isSuccess, data, searchTerm]);

  const handleCategoryChange = (selectedCategories: Set<string> | string[]) => {
    const categories = Array.from(selectedCategories).join(","); // Joining values into a string
    updateSearchParams("category", categories);
    setCategoryFilter(categories);
  };

  const handleUserChange = (selectedUsers: Set<string> | string[]) => {
    const users = Array.from(selectedUsers).join(",");
    updateSearchParams("userId", users); // Update userId parameter
    setUserFilter(users);
  };

  const handleUserClick = (userName: string) => {
    const index = userNames.indexOf(userName);
    if (index !== -1) {
      const userId = userIds[index]; // Get user ID based on index
      updateSearchParams("userId", userId); // Update search params with user ID
    }
  };

  const handleSortChange = (sortOption: string) => {
    const isUpvote = sortOption === "Upvotes";
    updateSearchParams("sort", isUpvote ? "upvotes" : "downvotes");
    setSortByUpvotes(isUpvote);
  };

  const handleSeeAll = (query: string) => {
    if (query) {
      const queryString = query.trim().split(" ");
      router.push(`/news-feed?query=${queryString}`);
    } else {
      Swal.fire({
        title: "Please enter a search term",
        text: "Enter a term to search for posts.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    updateSearchParams("search", data.search || "");
  };

  return (
    <div className="fixed left-0 right-0 z-20 bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap justify-center gap-4 items-center">
        {/* Category Selection */}
        <Select
          aria-labelledby="category-select"
          placeholder="Select categories"
          selectionMode="multiple"
          className="max-w-xs text-teal-600 w-full md:w-48"
          onSelectionChange={(values) =>
            handleCategoryChange(values as Set<string>)
          }
        >
          {categories.map((category, index) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>

        {/* User Selection */}
        <Select
          aria-labelledby="user-select"
          placeholder="All Users"
          selectionMode="multiple"
          className="max-w-xs text-teal-600 w-full md:w-48"
          onSelectionChange={(values) =>
            handleUserChange(values as Set<string>)
          }
        >
          {userNames.map((user, index) => (
            <SelectItem
              key={index}
              value={user}
              onClick={() => handleUserClick(user)}
            >
              {user}
            </SelectItem>
          ))}
        </Select>

        {/* Search Input */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full md:w-72 lg:w-96"
        >
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            aria-label="Search"
            placeholder="Search posts by title or content..."
            {...register("search")}
            className="pl-10 border border-gray-300 rounded-lg w-full"
          />
        </form>

        {/* Sort By Upvotes/Downvotes */}
        <Select
          aria-labelledby="sort-select"
          placeholder="Sort by"
          className="max-w-xs text-teal-600 w-full md:w-48"
          onSelectionChange={(value) => handleSortChange(value as string)}
        >
          <SelectItem key={1} value="Upvotes">
            Upvotes
          </SelectItem>
          <SelectItem key={2} value="Downvotes">
            Downvotes
          </SelectItem>
        </Select>

        {/* Search Button */}
        <Button
          onClick={() => handleSeeAll(searchTerm)}
          className="px-4 py-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-white rounded-lg shadow-md"
        >
          Search
        </Button>

        {/* 'Create Post' button with login check */}
        <Button className="btn-primary" onPress={handleCreatePostClick}>
          Create Post
        </Button>

        {/* Modal for Creating Post */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <PostModal closeModal={onOpenChange} />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Filtering;

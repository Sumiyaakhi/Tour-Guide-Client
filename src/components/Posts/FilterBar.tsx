"use client";

import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { PostModal } from "./PostModal";
import { Modal, ModalContent } from "@nextui-org/modal";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "@/src/types";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  userFilter: string;
  setUserFilter: (user: string) => void;
  sortByUpvotes: boolean;
  setSortByUpvotes: (sort: boolean) => void;
  categories: string[];
  user: IUser;
}

const FilterBar: React.FC<FilterBarProps> = ({
  setSortByUpvotes,
  categories,
  user,
  // Destructure isAuthenticated prop
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = !!user;
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

  // Function to handle sorting option change
  const handleSortChange = (value: string) => {
    if (value === "upvotes") {
      setSortByUpvotes(true);
    } else {
      setSortByUpvotes(false);
    }
  };

  // Handle 'Create Post' button click
  const handleCreatePostClick = () => {
    if (!isAuthenticated) {
      showLoginAlert();
    } else {
      onOpen(); // Open the modal if authenticated
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg w-full bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-white h-auto md:h-screen">
      {/* Category Filter Dropdown */}
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-semibold md:text-2xl">Category</label>
        <Select
          placeholder="All Categories"
          selectionMode="multiple"
          className="text-xl font-bold text-teal-600 rounded-none"
        >
          {categories.map((category, index) => (
            <SelectItem key={index} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Sort by Upvotes Select Dropdown */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold md:text-2xl">Sort by</label>
        <Select
          placeholder="Sort Options"
          className="text-xl font-bold text-teal-600 rounded-none"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <SelectItem key={1} value="upvotes">
            Sort by Upvotes
          </SelectItem>
          <SelectItem key={2} value="user">
            Sort by User
          </SelectItem>
        </Select>
      </div>

      <div>
        {/* 'Create Post' button with login check */}
        <Button onPress={handleCreatePostClick}>Create Post</Button>

        {/* Modal for Creating Post */}
        <Modal className="" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <PostModal closeModal={onOpenChange} />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default FilterBar;

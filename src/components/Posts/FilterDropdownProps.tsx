"use client";

import React, { useState } from "react";
import Filtering from "./Filtering";
import { FaFilter } from "react-icons/fa";
import { Button } from "@nextui-org/button";

interface FilterDropdownProps {
  categories: string[];
  userNames: string[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  categories,
  userNames,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <Button
        onClick={toggleDropdown}
        className="w-full bg-teal-500 text-white"
      >
        <FaFilter className="mr-2" />
        Filter Options
      </Button>
      {isDropdownOpen && (
        <div className="bg-white shadow-md rounded-lg p-4 mt-2">
          <Filtering categories={categories} userNames={userNames} />
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;

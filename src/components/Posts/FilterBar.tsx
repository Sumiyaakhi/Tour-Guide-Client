"use client";

import React from "react";

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
  users: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  userFilter,
  setUserFilter,
  sortByUpvotes,
  setSortByUpvotes,
  categories,
  users,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg w-full bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-white h-auto md:h-screen">
      {/* Category Filter Dropdown */}
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-semibold text-center md:text-2xl">
          Category
        </label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border text-teal-700 font-bold border-gray-300 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by Upvotes Checkbox */}
      <div className="flex flex-col">
        <label className="mb-2 font-semibold">Sort by Upvotes</label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sortByUpvotes}
            onChange={() => setSortByUpvotes(!sortByUpvotes)}
          />
          Sort by Upvotes
        </label>
      </div>
    </div>
  );
};

export default FilterBar;

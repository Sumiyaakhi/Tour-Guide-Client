"use client";

// components/LoadingSpinner.tsx
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="relative">
        {/* Spinner Circle */}
        <motion.div
          className="w-44 h-44 border-[12px] border-teal-500 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Text in the middle */}
        <div className="absolute inset-0 flex items-center justify-center text-black  text-2xl">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

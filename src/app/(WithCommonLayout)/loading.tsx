"use client";
import LoadingSpinner from "@/src/components/UI/LoadingSpinner";
import { useState, useEffect } from "react";

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds delay for demonstration

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl">Content Loaded Successfully!</h1>
    </div>
  );
};

export default LoadingPage;

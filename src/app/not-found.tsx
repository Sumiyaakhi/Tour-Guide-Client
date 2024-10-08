// pages/404.tsx

import { FC } from "react";
import Link from "next/link";

const NotFoundPage: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center p-8">
        <div className="text-9xl font-extrabold text-gray-900 flex justify-center items-center">
          <span className="mr-2">4</span>
          <div className="animate-spin inline-block h-24 w-24 border-8 border-t-gray-900 border-gray-300 rounded-full"></div>
          <span className="ml-2">4</span>
        </div>
        <p className="mt-8 text-2xl font-semibold text-gray-700">
          There's NOTHING here...
        </p>
        <p className="mt-4 text-gray-500">
          ...maybe the page you're looking for is not found or never existed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-gray-900 rounded-full font-semibold hover:bg-gray-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

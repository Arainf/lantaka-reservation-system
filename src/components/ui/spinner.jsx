import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-600 animate-spin border-t-transparent"></div>
      </div>
      <p className="mt-4 text-sm text-gray-500">Loading...</p>
    </div>
  );
};

export default Spinner;
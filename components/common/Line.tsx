import React from "react";

export const Line = ({ percentage }: { percentage: number }) => {
  return (
    <div className="py-4">
      <span id="ProgressLabel" className="sr-only">
        Loading
      </span>
      <span className="block rounded-full bg-gray-200">
        <span
          className="block h-1 rounded-full bg-[#0D8DC8]"
          style={{ width: `${percentage}%` }}
        ></span>
      </span>
    </div>
  );
};

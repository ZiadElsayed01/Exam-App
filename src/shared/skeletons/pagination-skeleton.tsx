"use client";

export default function PaginationSkeleton() {
  return (
    <div className="flex items-center gap-4">
      {/* Left side - Item count skeleton */}
      <div className="h-4 bg-gray-200 animate-pulse w-25"></div>

      {/* Right - Page navigation skeleton */}
      <div className="flex items-center">
        <div className="h-9 w-10 bg-gray-200 animate-pulse border"></div>
        <div className="h-9 w-28 bg-gray-200 animate-pulse border-y border-gray-200 mx-1"></div>
        <div className="h-9 w-10 bg-gray-200 animate-pulse border"></div>
      </div>
    </div>
  );
}

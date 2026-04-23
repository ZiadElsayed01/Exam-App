"use client";

import EndOfList from "@/shared/components/global/end-of-list";
import FallbackError from "@/shared/components/global/fallback-error";
import ScrollToView from "@/shared/components/global/scroll-to-view";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useDiplomaList from "../hooks/use-diploma-list";
import DiplomaListSkeleton from "../skeletons/diploma-list-skeleton";
import DiplomaItem from "./diploma-item";

export default function DiplomaList() {
  // Query
  const {
    data: diplomaData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useDiplomaList();

  // Variables
  const allDiplomas = useMemo(
    () => diplomaData?.pages.flatMap((page) => page?.data || []) || [],
    [diplomaData],
  );

  // Handlers
  if (isLoading) {
    return <DiplomaListSkeleton />;
  }

  if (error) {
    return <FallbackError error={error.message} />;
  }

  return (
    <div className="bg-white relative p-4">
      <InfiniteScroll
        dataLength={allDiplomas.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={
          <div className="py-4">
            <DiplomaListSkeleton />
          </div>
        }
        endMessage={
          diplomaData?.pages[0]?.data.length === 0 ? (
            <p className="p-2.5 bg-white text-center text-gray-600">
              No Diplomas Found
            </p>
          ) : (
            <EndOfList />
          )
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allDiplomas.map((diploma) => (
            <DiplomaItem key={diploma.id} diploma={diploma} />
          ))}
        </div>
      </InfiniteScroll>
      {hasNextPage && <ScrollToView />}
    </div>
  );
}

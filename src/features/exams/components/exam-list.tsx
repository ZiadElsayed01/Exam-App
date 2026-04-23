"use client";

import EndOfList from "@/shared/components/global/end-of-list";
import FallbackError from "@/shared/components/global/fallback-error";
import ScrollToView from "@/shared/components/global/scroll-to-view";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useExamList from "../hooks/use-exams-list";
import ExamItem from "./exam-item";
import ExamListSkeleton from "../skeletons/exam-list-skeleton";

interface ExamListProps {
  diplomaId: string;
}

export default function ExamList({ diplomaId }: ExamListProps) {
  // Query
  const {
    data: examData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useExamList({ diplomaId });

  // Variables
  const allDiplomas = useMemo(
    () => examData?.pages.flatMap((page) => page?.data || []) || [],
    [examData],
  );

  // Handlers
  if (isLoading) {
    return <ExamListSkeleton />;
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
            <ExamListSkeleton />
          </div>
        }
        endMessage={
          examData?.pages[0]?.data.length === 0 ? (
            <p className="p-2.5 bg-white text-center text-gray-600">
              No Exams Found
            </p>
          ) : (
            <EndOfList />
          )
        }
      >
        <div className="space-y-4">
          {allDiplomas.map((exam) => (
            <ExamItem key={exam.id} exam={exam} />
          ))}
        </div>
      </InfiniteScroll>
      {hasNextPage && <ScrollToView />}
    </div>
  );
}

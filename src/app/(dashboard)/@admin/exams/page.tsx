"use client";
import ExamTable from "@/features/exams/components/admin-dashboard/exam-table";
import SearchAndFilter from "@/features/exams/components/admin-dashboard/search-and-filter";
import { useExamListSingle } from "@/features/exams/hooks/use-exam";
import FallbackError from "@/shared/components/global/fallback-error";
import Pagination from "@/shared/components/global/pagination";
import { useMemo } from "react";

export default function ExamsPage() {
  const { data: examData, isLoading, error } = useExamListSingle();

  // Memoize exams data to prevent unnecessary re-renders
  const exams = useMemo(() => examData?.data || [], [examData?.data]);

  if (error) {
    return (
      <>
        <div className="mx-6">
          <FallbackError error={error.message} />
        </div>
      </>
    );
  }

  return (
    <>
      <Pagination
        data={examData}
        isLoading={isLoading}
        href="/exams/add-new-exam"
        addText="Add New Exam"
      />

      <div className="p-6 space-y-6 min-h-screen">
        <SearchAndFilter />

        <ExamTable exams={exams} isLoading={isLoading} />
      </div>
    </>
  );
}

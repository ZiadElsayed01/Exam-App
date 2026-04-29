"use client";
import DiplomaTable from "@/features/diplomas/components/admin-dashboard/diploma-table";
import SearchAndFilter from "@/features/diplomas/components/admin-dashboard/search-and-filter";
import { useDiplomaListSingle } from "@/features/diplomas/hooks/use-diploma";
import FallbackError from "@/shared/components/global/fallback-error";
import Pagination from "@/shared/components/global/pagination";
import { useMemo } from "react";

export default function DiplomasPage() {
  const { data: diplomaData, isLoading, error } = useDiplomaListSingle();

  // Memoize diplomas data to prevent unnecessary re-renders
  const diplomas = useMemo(() => diplomaData?.data || [], [diplomaData?.data]);

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
        data={diplomaData}
        isLoading={isLoading}
        href="/diplomas/add-new-diploma"
        addText="Add New Diploma"
      />

      <div className="p-6 space-y-6 min-h-screen">
        <SearchAndFilter />

        <DiplomaTable diplomas={diplomas} isLoading={isLoading} />
      </div>
    </>
  );
}

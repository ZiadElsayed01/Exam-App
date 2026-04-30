"use client";
import ClearAllAuditButton from "@/features/audit-log/components/clear-all-audit";
import { Button } from "@/shared/components/ui/button";
import PaginationSkeleton from "@/shared/skeletons/pagination-skeleton";
import { IPaginatedResponse } from "@/shared/types/api";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps<T> {
  data:
    | IPaginatedResponse<T>
    | (IPaginatedResponse<T> | undefined)[]
    | undefined;
  isLoading?: boolean;
  href: string;
  addText: string;
  audit?: boolean;
}

export default function Pagination<T>({
  data,
  isLoading = false,
  href,
  addText,
  audit,
}: PaginationProps<T>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();


  // Handle the case where data is an array (from infinite scroll) or single object
  const currentPageData = Array.isArray(data)
    ? data.find((page) => page !== undefined)
    : data;

  if (!currentPageData && !isLoading) {
    return null;
  }

  // Provide default values when data is not available yet
  const metadata = currentPageData?.metadata || {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  };
  const { page, limit, total, totalPages } = metadata;

  // Calculate the range of items being displayed
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  return (
    <div className="bg-white py-1.5 px-6 flex items-center justify-between border-t sticky top-0 z-50">
      {/* Left - Page navigation with loading state */}
      {isLoading ? (
        <PaginationSkeleton />
      ) : (
        <div className="flex items-center">
          <p className="text-sm text-gray-800 mr-4">
            {startItem} - {endItem} of {total}
          </p>

          <Button
            size="icon"
            onClick={handlePreviousPage}
            disabled={page <= 1}
            className="h-10 w-10 bg-gray-200 border"
          >
            <ChevronLeft className="h-4.5 w-4.5 text-gray-800" />
          </Button>

          <p className="flex items-center justify-center text-sm text-gray-400 h-9.5 w-28.25 border-y border-gray-200">
            Page {page} of {totalPages}
          </p>

          <Button
            size="icon"
            onClick={handleNextPage}
            disabled={page >= totalPages}
            className="h-10 w-10 bg-gray-200 border"
          >
            <ChevronRight className="h-4.5 w-4.5 text-gray-800" />
          </Button>
        </div>
      )}

      {/* Right side - Add New button || Clear All logs */}
      {audit ? (
        <ClearAllAuditButton />
      ) : (
        <Link
          href={href}
          className="h-10 p-4 text-sm bg-emerald-500 flex items-center justify-center text-white"
        >
          <Plus className="mr-2.5 w-4.5 h-4.5" />
          {addText}
        </Link>
      )}
    </div>
  );
}

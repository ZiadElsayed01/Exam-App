"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ChevronsDownUp, Search, SlidersHorizontal } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import useDiplomaDropdown from "@/features/diplomas/hooks/use-diploma-dropdown";
import { IDiploma } from "@/features/diplomas/types/diploma";

function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState(searchParams.get("search") || "");
  const [diplomaId, setDiplomaId] = useState(
    searchParams.get("diplomaId") || "",
  );
  const [immutability, setImmutability] = useState(
    searchParams.get("immutable") || "",
  );
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  // Fetch diplomas for dropdown with infinite scroll
  const {
    data: diplomasData,
    fetchNextPage,
    hasNextPage,
  } = useDiplomaDropdown();

  const diplomas = useMemo(
    () => diplomasData?.pages.flatMap((page) => page?.data || []) || [],
    [diplomasData],
  );

  const immutabilityOptions = [
    { value: "", label: "None" },
    { value: "false", label: "Immutable" },
    { value: "true", label: "Mutable" },
  ];

  const handleApply = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (title.trim()) {
      params.set("search", title.trim());
    } else {
      params.delete("search");
    }

    if (diplomaId) {
      params.set("diplomaId", diplomaId);
    } else {
      params.delete("diplomaId");
    }

    if (immutability) {
      params.set("immutable", immutability);
    } else {
      params.delete("immutable");
    }

    params.set("page", "1");

    router.push(`${window.location.pathname}?${params.toString()}`);
  }, [title, diplomaId, immutability, searchParams, router]);

  const handleClear = useCallback(() => {
    setTitle("");
    setDiplomaId("");
    setImmutability("");

    const params = new URLSearchParams();
    params.set("page", "1");

    router.push(`${window.location.pathname}?${params.toString()}`);
  }, [router]);

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between bg-primary text-white p-2.5">
        <div className="font-semibold flex items-center gap-1.5 font-inter">
          <SlidersHorizontal className="h-5 w-5" />
          Search & Filters
        </div>
        <Button
          className="p-0 h-0"
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
        >
          <ChevronsDownUp className="h-3.5 w-3.5" />
          {isFilterExpanded ? "Hide" : "Show"}
        </Button>
      </div>

      {isFilterExpanded && (
        <div className="space-y-2.5 p-4">
          {/* Search Input */}
          <div className="relative">
            <Input
              placeholder="Search by title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full "
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-2.5">
            {/* Diploma Select */}
            <Select
              value={diplomaId || ""}
              onValueChange={(value) => {
                setDiplomaId(value!);
              }}
            >
              <SelectTrigger className="w-81.5 h-10 capitalize">
                <SelectValue placeholder="Select Diploma">
                  {diplomaId
                    ? diplomas.find(
                        (diploma: IDiploma) => diploma.id === diplomaId,
                      )?.title
                    : "Select Diploma"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <div
                  id="diploma-dropdown-scroll"
                  className="max-h-50 overflow-auto"
                >
                  <InfiniteScroll
                    dataLength={diplomas?.length}
                    next={() => fetchNextPage()}
                    hasMore={hasNextPage}
                    loader={
                      <div className="p-2 text-center text-sm">Loading...</div>
                    }
                    scrollableTarget="diploma-dropdown-scroll"
                  >
                    <SelectItem value="">None</SelectItem>
                    {diplomas.map((diploma: IDiploma) => (
                      <SelectItem key={diploma.id} value={diploma.id}>
                        {diploma.title}
                      </SelectItem>
                    ))}
                  </InfiniteScroll>
                </div>
              </SelectContent>
            </Select>

            {/* Immutability Select */}
            <Select
              value={immutability || ""}
              onValueChange={(value) => {
                setImmutability(value!);
              }}
            >
              <SelectTrigger className="w-81.5 h-10 capitalize">
                <SelectValue placeholder="Immutability">
                  {immutability
                    ? immutabilityOptions.find(
                        (option) => option.value === immutability,
                      )?.label
                    : "Immutability"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {immutabilityOptions.map((option) => (
                  <SelectItem key={option.label} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleClear}
              className="h-9 w-25 text-sm font-medium text-gray-800 bg-white border-none"
            >
              Clear
            </Button>
            <Button
              onClick={handleApply}
              className="h-9 w-25 text-sm bg-gray-200 text-gray-800"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(SearchAndFilter);

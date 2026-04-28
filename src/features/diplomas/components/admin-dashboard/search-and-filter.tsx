"use client";

import { memo, useCallback, useState } from "react";
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

function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState(searchParams.get("search") || "");
  const [immutability, setImmutability] = useState(
    searchParams.get("immutable") || "",
  );
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  const immutabilityOptions = [
    { value: "", label: "None" },
    { value: "false", label: "Immutable" },
    { value: "true", label: "Mutable" },
  ];

  // Memoize search and filter handlers to prevent re-renders
  const onSearch = useCallback((title: string, immutability: string) => {
    console.log("Search:", { title, immutability });
    // Search is handled by URL params in SearchAndFilter component
  }, []);

  const onClear = useCallback(() => {
    console.log("Clear search");
    // Clear is handled by URL params in SearchAndFilter component
  }, []);

  const handleApply = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (title.trim()) {
      params.set("search", title.trim());
    } else {
      params.delete("search");
    }

    if (immutability) {
      params.set("immutable", immutability);
    } else {
      params.delete("immutable");
    }

    params.set("page", "1");

    router.push(`${window.location.pathname}?${params.toString()}`);

    if (onSearch) {
      onSearch(title.trim(), immutability);
    }
  }, [title, immutability, searchParams, router, onSearch]);

  const handleClear = useCallback(() => {
    setTitle("");
    setImmutability("");

    const params = new URLSearchParams();
    params.set("page", "1");

    router.push(`${window.location.pathname}?${params.toString()}`);

    if (onClear) {
      onClear();
    }
  }, [router, onClear]);

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

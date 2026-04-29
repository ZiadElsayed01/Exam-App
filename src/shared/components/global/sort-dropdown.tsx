"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { SimpleDropdown, SimpleDropdownItem } from "../ui/simple-dropdown";
import { ArrowDownWideNarrow } from "lucide-react";
import { ISortOption } from "../../types";

interface ISortDropdownProps {
  sortOptions: ISortOption[];
  gray?: boolean;
}

export function SortDropdown({
  sortOptions,
  gray = false,
}: ISortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") || "";
  const currentSortOrder = searchParams.get("sortOrder") || "";

  const handleSortChange = (sortBy: string, sortOrder: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1");

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <SimpleDropdown
      trigger={
        <Button className={`${gray && "bg-gray-300 text-sm font-medium"}`}>
          <p
            className={`flex items-center gap-1.5 ${gray ? "text-gray-800" : "text-white"}`}
          >
            Sort
            <ArrowDownWideNarrow
              className={`w-4.5 h-4.5 ${gray ? "text-gray-800" : "text-white"}`}
            />
          </p>
        </Button>
      }
      align="end"
      contentClassName="w-65"
    >
      {sortOptions.map((option) => (
        <SimpleDropdownItem
          key={option.value}
          onClick={() => handleSortChange(option.sortBy, option.sortOrder)}
          className={`cursor-pointer ${
            option.sortBy === currentSortBy &&
            option.sortOrder === currentSortOrder
              ? "bg-blue-50"
              : ""
          }`}
        >
          <div className="flex items-center gap-2.5">
            <option.icon className="w-4.5 h-4.5 text-gray-400" />
            <div className="flex gap-1 items-center">
              <p
                className={`cursor-pointer ${
                  option.sortBy === currentSortBy &&
                  option.sortOrder === currentSortOrder
                    ? "font-semibold"
                    : ""
                }`}
              >
                {option.label}
              </p>
              <p className="text-xs text-gray-500">{option.subLabel}</p>
            </div>
          </div>
        </SimpleDropdownItem>
      ))}
    </SimpleDropdown>
  );
}

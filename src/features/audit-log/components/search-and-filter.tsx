"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ChevronsDownUp, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useState, useMemo } from "react";
import { actionOptions, categoryOptions } from "../constants/audit.constants";
import InfiniteScroll from "react-infinite-scroll-component";
import useUsersDropdown from "../hooks/use-users-dropdown";
import { IUser } from "../hooks/use-users-dropdown";

function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [action, setAction] = useState(searchParams.get("action") || "");
  const [user, setUser] = useState(searchParams.get("actorUserId") || "");
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  // Fetch users for dropdown with infinite scroll
  const { data: usersData, fetchNextPage, hasNextPage } = useUsersDropdown();

  const users = useMemo(
    () => usersData?.pages.flatMap((page) => page?.data || []) || [],
    [usersData],
  );

  const handleApply = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (action) {
      params.set("action", action);
    } else {
      params.delete("action");
    }

    if (user.trim()) {
      params.set("actorUserId", user.trim());
    } else {
      params.delete("actorUserId");
    }

    params.set("page", "1");

    router.push(`${window.location.pathname}?${params.toString()}`);
  }, [search, category, action, user, searchParams, router]);

  const handleClear = useCallback(() => {
    setSearch("");
    setCategory("");
    setAction("");
    setUser("");

    const params = new URLSearchParams();
    params.set("page", "1");

    router.push(`${window.location.pathname}?${params.toString()}`);
  }, [router]);

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between bg-primary text-white p-2.5 ">
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
        <div className="space-y-2.5 grid grid-cols-3 gap-4 p-4 pb-0">
          {/* Category Select */}
          <Select
            value={category || ""}
            onValueChange={(value) => {
              setCategory(value!);
            }}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Category">
                {category
                  ? categoryOptions.find((option) => option.value === category)
                      ?.label
                  : "Category"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Action Select */}
          <Select
            value={action || ""}
            onValueChange={(value) => {
              setAction(value!);
            }}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Action">
                {action
                  ? actionOptions.find((option) => option.value === action)
                      ?.label
                  : "Action"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {actionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* User Select */}
          <Select
            value={user || ""}
            onValueChange={(value) => {
              setUser(value!);
            }}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="User">
                {user
                  ? users.find(
                      (selectedUser: IUser) => selectedUser.id === user,
                    )?.username
                  : "User"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <div id="user-dropdown-scroll" className="max-h-50 overflow-auto">
                <InfiniteScroll
                  dataLength={users?.length}
                  next={() => fetchNextPage()}
                  hasMore={hasNextPage}
                  loader={
                    <div className="p-2 text-center text-sm">Loading...</div>
                  }
                  scrollableTarget="user-dropdown-scroll"
                >
                  <SelectItem value="">None</SelectItem>
                  {users.map((user: IUser) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.username}
                    </SelectItem>
                  ))}
                </InfiniteScroll>
              </div>
            </SelectContent>
          </Select>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2 p-4 pt-0">
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
  );
}

export default memo(SearchAndFilter);

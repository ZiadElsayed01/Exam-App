"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import InfiniteScroll from "react-infinite-scroll-component";
import { IDiploma } from "@/features/diplomas/types/diploma";

interface DiplomaSelectProps {
  value: string;
  onValueChange: (value: string | null) => void;
  diplomas: IDiploma[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  placeholder?: string;
  className?: string;
}

export default function DiplomaSelect({
  value,
  onValueChange,
  diplomas,
  hasNextPage,
  fetchNextPage,
  placeholder = "Select Diploma",
  className = "w-81.5 h-10 capitalize",
}: DiplomaSelectProps) {
  return (
    <Select value={value || ""} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {value
            ? diplomas.find((diploma: IDiploma) => diploma.id === value)?.title
            : placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div id="diploma-dropdown-scroll" className="max-h-50 overflow-auto">
          <InfiniteScroll
            dataLength={diplomas?.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<div className="p-2 text-center text-sm">Loading...</div>}
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
  );
}

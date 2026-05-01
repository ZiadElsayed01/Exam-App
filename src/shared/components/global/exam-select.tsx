"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import InfiniteScroll from "react-infinite-scroll-component";
import { IExam } from "@/features/exams/types/exams";

interface ExamSelectProps {
  value: string;
  onValueChange: (value: string | null) => void;
  exams: IExam[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  placeholder?: string;
  className?: string;
  preselectedExamTitle?: string;
}

export default function ExamSelect({
  value,
  onValueChange,
  exams,
  hasNextPage,
  fetchNextPage,
  placeholder = "Select exam",
  className = "w-81.5 h-10 capitalize",
  preselectedExamTitle,
}: ExamSelectProps) {
  return (
    <Select value={value || ""} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {value
            ? exams.find((exam: IExam) => exam.id === value)?.title ||
              preselectedExamTitle
            : placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div id="exam-dropdown-scroll" className="max-h-50 overflow-auto">
          <InfiniteScroll
            dataLength={exams?.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<div className="p-2 text-center text-sm">Loading...</div>}
            scrollableTarget="exam-dropdown-scroll"
          >
            <SelectItem value="">None</SelectItem>
            {exams.map((exam: IExam) => (
              <SelectItem key={exam.id} value={exam.id}>
                {exam.title}
              </SelectItem>
            ))}
          </InfiniteScroll>
        </div>
      </SelectContent>
    </Select>
  );
}

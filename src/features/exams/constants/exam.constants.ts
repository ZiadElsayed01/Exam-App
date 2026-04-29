import { ISortOption } from "@/shared/types";
import {
  ArrowDownAZ,
  ArrowUpZA,
  CalendarArrowDown,
  CalendarArrowUp,
  ArrowDown01,
  ArrowUp01,
} from "lucide-react";

export const examSortOptions: ISortOption[] = [
  {
    label: "Title ",
    subLabel: "(descending)",
    value: "title_desc",
    sortBy: "title",
    sortOrder: "desc",
    icon: ArrowDownAZ,
  },
  {
    label: "Title",
    subLabel: "(ascending)",
    value: "title_asc",
    sortBy: "title",
    sortOrder: "asc",
    icon: ArrowUpZA,
  },
  {
    label: "Questions No.",
    subLabel: "(descending)",
    value: "questionsCount_desc",
    sortBy: "questions",
    sortOrder: "desc",
    icon: ArrowDown01,
  },
  {
    label: "Questions No.",
    subLabel: "(ascending)",
    value: "questionsCount_asc",
    sortBy: "questions",
    sortOrder: "asc",
    icon: ArrowUp01,
  },
  {
    label: "Newest",
    subLabel: "(descending)",
    value: "newest_desc",
    sortBy: "createdAt",
    sortOrder: "desc",
    icon: CalendarArrowDown,
  },
  {
    label: "Newest",
    subLabel: "(ascending)",
    value: "newest_asc",
    sortBy: "createdAt",
    sortOrder: "asc",
    icon: CalendarArrowUp,
  },
];

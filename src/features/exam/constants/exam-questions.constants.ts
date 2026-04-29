import { ArrowDownNarrowWide, ArrowUpNarrowWide, Calendar } from "lucide-react";
import { ISortOption } from "@/shared/types";

export const examQuestionSortOptions: ISortOption[] = [
  {
    label: "Title",
    subLabel: "A-Z",
    value: "title-asc",
    sortBy: "title",
    sortOrder: "asc",
    icon: ArrowDownNarrowWide,
  },
  {
    label: "Title",
    subLabel: "Z-A",
    value: "title-desc",
    sortBy: "title",
    sortOrder: "desc",
    icon: ArrowUpNarrowWide,
  },
  {
    label: "Created",
    subLabel: "Newest",
    value: "createdAt-desc",
    sortBy: "createdAt",
    sortOrder: "desc",
    icon: Calendar,
  },
  {
    label: "Created",
    subLabel: "Oldest",
    value: "createdAt-asc",
    sortBy: "createdAt",
    sortOrder: "asc",
    icon: Calendar,
  },
];

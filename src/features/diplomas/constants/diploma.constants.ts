import { ISortOption } from "@/shared/types";
import {
  ArrowDownAZ,
  ArrowUpZA,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";

export const diplomaSortOptions: ISortOption[] = [
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

import { ISortOption } from "@/shared/types";
import {
  ArrowDownAZ,
  ArrowUpZA,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";

export const auditSortOptions: ISortOption[] = [
  {
    label: "Action",
    subLabel: "(descending)",
    value: "action_desc",
    sortBy: "action",
    sortOrder: "desc",
    icon: ArrowDownAZ,
  },
  {
    label: "Action",
    subLabel: "(ascending)",
    value: "action_asc",
    sortBy: "action",
    sortOrder: "asc",
    icon: ArrowUpZA,
  },
  {
    label: "User",
    subLabel: "(descending)",
    value: "user_desc",
    sortBy: "user",
    sortOrder: "desc",
    icon: ArrowDownAZ,
  },
  {
    label: "User",
    subLabel: "(ascending)",
    value: "user_asc",
    sortBy: "user",
    sortOrder: "asc",
    icon: ArrowUpZA,
  },
  {
    label: "Entity",
    subLabel: "(descending)",
    value: "entity_desc",
    sortBy: "entity",
    sortOrder: "desc",
    icon: ArrowDownAZ,
  },
  {
    label: "Entity",
    subLabel: "(ascending)",
    value: "entity_asc",
    sortBy: "entity",
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

export const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "DIPLOMA", label: "Diploma" },
  { value: "EXAM", label: "Exam" },
  { value: "QUESTION", label: "Question" },
  { value: "USER", label: "User" },
  { value: "SYSTEM", label: "System" },
];

export const actionOptions = [
  { value: "", label: "All Actions" },
  { value: "CREATE", label: "Create" },
  { value: "UPDATE", label: "Update" },
  { value: "DELETE", label: "Delete" },
  { value: "SET_IMMUTABLE", label: "Set Immutable" },
  { value: "SEED_DATA", label: "Seed Data" },
];

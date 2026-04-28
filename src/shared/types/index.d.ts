import { LucideProps } from "lucide-react";

export interface ISortOption {
  label: string;
  subLabel: string;
  value: string;
  sortBy: string;
  sortOrder: string;
  icon: React.ComponentType<LucideProps>;
}

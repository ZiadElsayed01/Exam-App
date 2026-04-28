import { PAGINATION_LIMIT } from "@/shared/constants/api-headers.constants";

export const DIPLOMA_KEYS = {
  list: (
    page: number = 1,
    limit: number = PAGINATION_LIMIT,
    sortBy: string = "title",
    sortOrder: string = "asc",
    search: string = "",
    immutable: boolean | undefined = undefined,
  ) => ["diplomas", page, limit, sortBy, sortOrder, search, immutable] as const,
} as const;

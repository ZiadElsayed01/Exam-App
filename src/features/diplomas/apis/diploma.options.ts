import { PAGINATION_LIMIT } from "@/shared/constants/api-headers.constants";

export const DIPLOMA_KEYS = {
  list: (page: number = 1, limit: number = PAGINATION_LIMIT) =>
    ["diplomas", page, limit] as const,
} as const;

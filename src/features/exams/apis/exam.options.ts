import { PAGINATION_LIMIT } from "@/shared/constants/api-headers.constants";

export const EXAMS_KEYS = {
  list: (
    diplomeId: string,
    page: number = 1,
    limit: number = PAGINATION_LIMIT,
  ) => ["exams", diplomeId, page, limit] as const,
} as const;

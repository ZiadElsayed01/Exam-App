import { PAGINATION_LIMIT } from "@/shared/constants/api-headers.constants";

export const EXAMS_KEYS = {
  list: (
    page: number = 1,
    limit: number = PAGINATION_LIMIT,
    sortBy: string = "",
    sortOrder: string = "",
    search: string = "",
    diplomaId: string = "",
    immutable: boolean | undefined = undefined,
  ) =>
    [
      "exams",
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      diplomaId,
      immutable,
    ] as const,
} as const;

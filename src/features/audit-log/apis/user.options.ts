export const USER_KEYS = {
  all: ["users"] as const,
  list: (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    search: string,
    role: string,
  ) =>
    [
      ...USER_KEYS.all,
      "list",
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      role,
    ] as const,
  details: (id: string) => [...USER_KEYS.all, "detail", id] as const,
};

export const AUDIT_KEYS = {
  all: ["audit-logs"] as const,
  list: (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    search: string,
    category: string,
    action: string,
    actorUserId: string,
  ) =>
    [
      ...AUDIT_KEYS.all,
      "list",
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      category,
      action,
      actorUserId,
    ] as const,
  detail: (id: string) => [...AUDIT_KEYS.all, "detail", id] as const,
};

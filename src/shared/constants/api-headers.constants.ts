export const HEADERS = {
  JSON: {
    "Content-Type": "application/json",
  },
  AUTH: (token: string) => ({
    Authorization: `Bearer ${token}`,
  }),
};

export const PAGINATION_LIMIT = 6;

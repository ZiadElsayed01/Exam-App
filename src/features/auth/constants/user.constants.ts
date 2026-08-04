export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  SUPER_ADMIN: "SUPER_ADMIN",

  ADMIN_SUPER: ["ADMIN", "SUPER_ADMIN"],
} as const;

export function isAdminRole(
  role?: (typeof USER_ROLES)[keyof typeof USER_ROLES],
): boolean {
  return (
    role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN
  );
}

import { USER_ROLES } from "../constants/user.constants";

export type UserRoles = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  profilePhoto?: string;
  role: UserRoles;
}

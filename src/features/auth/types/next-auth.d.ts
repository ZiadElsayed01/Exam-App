import "next-auth";
import "next-auth/jwt";
import { IUser } from "./user.d";
import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    user: IUser;
    token: string;
  }

  interface Session {
    user: IUser;
  }
}

declare module "next-auth/jwt" {
  type JWT = User;
}

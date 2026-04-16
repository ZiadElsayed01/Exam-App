import { IUser } from "./user";
import { loginSchema } from "../schemas/login.schema";
import { z } from "zod";

export type LoginCredentials = z.infer<typeof loginSchema>;

export interface LoginResponse {
  user: IUser;
  token: string;
}

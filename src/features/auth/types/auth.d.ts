import { IUser } from "./user";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
import { z } from "zod";

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;

export interface LoginResponse {
  user: IUser;
  token: string;
}

export interface RegisterResponse {
  user: IUser;
  token: string;
}

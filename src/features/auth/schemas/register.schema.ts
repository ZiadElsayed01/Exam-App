import { z } from "zod";

// Email step schema
export const emailSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),
  })
  .strict();

// OTP verification schema
export const otpSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    code: z
      .string()
      .length(6, "OTP must be 6 digits")
      .regex(/^\d+$/, "OTP must contain only digits"),
  })
  .strict();

// User info step schema
export const userInfoSchema = z
  .object({
    username: z.string("Invalid username").nonempty("Username is required"),
    email: z.string().email("Invalid email format"),
    firstName: z
      .string("Invalid first name")
      .nonempty("First name is required"),
    lastName: z.string("Invalid last name").nonempty("Last name is required"),
    phone: z.string("Invalid phone number").optional(),
  })
  .strict();

// Password step schema
export const passwordSchema = z
  .object({
    password: z.string("Invalid password").nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Complete register schema for final submission
export const registerSchema = z
  .object({
    username: z.string("Invalid username").nonempty("Username is required"),
    email: z.string().email("Invalid email format"),
    password: z.string("Invalid password").nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
    firstName: z
      .string("Invalid first name")
      .nonempty("First name is required"),
    lastName: z.string("Invalid last name").nonempty("Last name is required"),
    phone: z.string("Invalid phone number").optional(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Type definitions
export type EmailFormData = z.infer<typeof emailSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type UserInfoFormData = z.infer<typeof userInfoSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

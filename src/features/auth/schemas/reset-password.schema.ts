import z from "zod";

export const newPasswordSchema = z
  .object({
    token: z.string().nonempty("Token is required"),
    newPassword: z.string("Invalid password").nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof newPasswordSchema>;

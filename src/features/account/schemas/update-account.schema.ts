import z from "zod";

export const userUpdateInfoSchema = z.object({
  firstName: z.string("Invalid first name").nonempty("First name is required"),
  lastName: z.string("Invalid last name").nonempty("Last name is required"),
  phone: z.string("Invalid phone number").optional(),
  profilePhoto: z.string("Invalid profile Photo").optional(),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string("Invalid current password")
      .nonempty("Current password is required"),
    newPassword: z
      .string("Invalid new password")
      .nonempty("New password is required"),
    confirmPassword: z
      .string("Invalid confirm password")
      .nonempty("Confirm password is required"),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password don't match",
    path: ["confirmPassword"],
  });

export const changeEmailSchema = z.object({
  newEmail: z
    .string()
    .email("Invalid email format")
    .nonempty("Email is required"),
});

export const confirmEmailSchema = z.object({
  code: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export type UserUpdateInfoFormData = z.infer<typeof userUpdateInfoSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
export type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;
export type ConfirmEmailFormData = z.infer<typeof confirmEmailSchema>;

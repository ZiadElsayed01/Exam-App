import z from "zod";

export const userUpdateInfoSchema = z.object({
  firstName: z.string("Invalid first name").nonempty("First name is required"),
  lastName: z.string("Invalid last name").nonempty("Last name is required"),
  phone: z.string("Invalid phone number").optional(),
  profilePhoto: z.string("Invalid profile Photo").optional(),
});

export type UserUpdateInfoFormData = z.infer<typeof userUpdateInfoSchema>;

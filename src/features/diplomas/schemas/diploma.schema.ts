import { z } from "zod";

export const diplomaSchema = z.object({
  title: z.string("Invalid title").nonempty("Title is required"),
  description: z
    .string("Invalid description")
    .nonempty("Description is required"),
  image: z.string("Invalid image").nonempty("Image is required"),
});

export type DiplomaFormData = z.infer<typeof diplomaSchema>;

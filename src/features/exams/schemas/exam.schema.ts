import { z } from "zod";

export const examSchema = z.object({
  title: z.string("Invalid title").nonempty("Title is required"),
  diplomaId: z.string("Invalid diploma").nonempty("Diploma is required"),
  description: z
    .string("Invalid description")
    .nonempty("Description is required"),
  image: z.string("Invalid image").nonempty("Image is required"),
  duration: z
    .number("Invalid duration")
    .min(1, "Duration must be at least 1 minute"),
});

export type ExamFormData = z.infer<typeof examSchema>;

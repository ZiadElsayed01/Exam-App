import { z } from "zod";

export const imageSchema = z
  .object({
    image: z
      .file()
      .min(1)
      .max(5 * 1024 * 1024)
      .refine((file) => file.type.startsWith("image/"), {
        message: "File must be an image",
      }),
  })
  .strict();

export type ImageSchema = z.infer<typeof imageSchema>;

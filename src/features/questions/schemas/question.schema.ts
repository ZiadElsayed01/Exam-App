import { z } from "zod";

export const answerSchema = z.object({
  text: z.string().min(1, "Answer text is required"),
  isCorrect: z.boolean(),
});

export const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  examId: z.string().min(1, "Please select an exam"),
  answers: z
    .array(answerSchema)
    .min(2, "At least 2 answers are required")
    .max(4, "Maximum 4 answers allowed")
    .refine(
      (answers) => answers.some((answer) => answer.isCorrect),
      "At least one answer must be marked as correct",
    )
    .refine(
      (answers) => answers.filter((answer) => answer.isCorrect).length === 1,
      "Only one answer can be marked as correct",
    ),
});

export const bulkQuestionsSchema = z.object({
  questions: z
    .array(
      z.object({
        text: z.string().min(1, "Question text is required"),
        answers: z
          .array(answerSchema)
          .min(2, "At least 2 answers are required")
          .max(4, "Maximum 4 answers allowed")
          .refine(
            (answers) => answers.some((answer) => answer.isCorrect),
            "At least one answer must be marked as correct",
          )
          .refine(
            (answers) =>
              answers.filter((answer) => answer.isCorrect).length === 1,
            "Only one answer can be marked as correct",
          ),
      }),
    )
    .min(1, "At least one question is required")
    .max(10, "Maximum 10 questions allowed per bulk add"),
});

export type QuestionFormData = z.infer<typeof questionSchema>;
export type BulkQuestionsFormData = z.infer<typeof bulkQuestionsSchema>;

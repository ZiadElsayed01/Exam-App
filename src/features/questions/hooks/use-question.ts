import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  QuestionFormData,
  BulkQuestionsFormData,
} from "../schemas/question.schema";
import {
  createQuestionAction,
  updateQuestionAction,
  deleteQuestionAction,
  createBulkQuestionsAction,
  immutableQuestionAction,
} from "../apis/questions.api";

export function useCreateBulkQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      examId,
      data,
    }: {
      examId: string;
      data: BulkQuestionsFormData;
    }) => {
      const result = await createBulkQuestionsAction(examId, data);

      if (!result?.status) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: QuestionFormData) => {
      const result = await createQuestionAction(data);

      if (!result?.status) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useUpdateQuestion(questionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: QuestionFormData) => {
      const result = await updateQuestionAction(questionId, data);

      if (!result?.status) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useDeleteQuestion(questionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-question"],
    mutationFn: async () => {
      const response = await deleteQuestionAction(questionId);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

export function useImmutableQuestion(questionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["immutable-Question"],
    mutationFn: async () => {
      const response = await immutableQuestionAction(questionId);

      if (!response?.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

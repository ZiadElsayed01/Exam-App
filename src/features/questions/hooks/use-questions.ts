import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuestionAction } from "../apis/questions.api";

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

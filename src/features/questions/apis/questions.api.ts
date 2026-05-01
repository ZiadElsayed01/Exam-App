"use server";
import { getNextAuthToken } from "@/shared/lib/utils/auth.utils";
import { HEADERS } from "@/shared/constants/api-headers.constants";
import { IApiResponse } from "@/shared/types/api";
import { IQuestion } from "@/features/exam/types/questions";
import {
  QuestionFormData,
  BulkQuestionsFormData,
} from "../schemas/question.schema";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getExamQustionsAction(
  id: string,
  options?: {
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    immutable?: boolean;
  },
): Promise<{ questions: IQuestion[] }> {
  const token = await getNextAuthToken();

  if (!token) {
    return { questions: [] };
  }

  const params = new URLSearchParams();
  if (options?.sortBy) params.set("sortBy", options.sortBy);
  if (options?.sortOrder) params.set("sortOrder", options.sortOrder);
  if (options?.search) params.set("search", options.search);
  if (options?.immutable !== undefined)
    params.set("immutable", options.immutable.toString());

  const queryString = params.toString();
  const url = `${API_URL}/questions/exam/${id}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    headers: {
      ...HEADERS.AUTH(token.token),
    },
  });

  const payload: IApiResponse<{ questions: IQuestion[] }> =
    await response.json();

  if (payload.status && payload.payload) {
    return payload.payload;
  }

  return { questions: [] };
}

export async function getQuestionById(questionId: string) {
  const token = await getNextAuthToken();

  const response = await fetch(`${API_URL}/questions/${questionId}`, {
    headers: {
      ...HEADERS.AUTH(token!.token),
    },
  });

  const payload: IApiResponse<{ question: IQuestion }> = await response.json();

  if (!payload.status || !payload.payload) {
    return undefined;
  }

  return payload.payload.question;
}

export async function createBulkQuestionsAction(
  examId: string,
  values: BulkQuestionsFormData,
) {
  const token = await getNextAuthToken();

  const response = await fetch(`${API_URL}/questions/exam/${examId}/bulk`, {
    method: "POST",
    headers: {
      ...HEADERS.AUTH(token!.token),
      ...HEADERS.JSON,
    },
    body: JSON.stringify(values),
  });

  const payload: IApiResponse<void> = await response.json();

  return payload;
}

export async function createQuestionAction(values: QuestionFormData) {
  const token = await getNextAuthToken();

  const response = await fetch(`${API_URL}/questions`, {
    method: "POST",
    headers: {
      ...HEADERS.AUTH(token!.token),
      ...HEADERS.JSON,
    },
    body: JSON.stringify(values),
  });

  const payload: IApiResponse<void> = await response.json();

  return payload;
}

export async function updateQuestionAction(
  questionId: string,
  values: QuestionFormData,
) {
  const token = await getNextAuthToken();
  const { examId, ...questionData } = values;

  const response = await fetch(`${API_URL}/questions/${questionId}`, {
    method: "PUT",
    headers: {
      ...HEADERS.AUTH(token!.token),
      ...HEADERS.JSON,
    },
    body: JSON.stringify(questionData),
  });

  const payload: IApiResponse<void> = await response.json();

  return payload;
}

export async function deleteQuestionAction(questionId: string) {
  const token = await getNextAuthToken();

  const response = await fetch(`${API_URL}/questions/${questionId}`, {
    method: "DELETE",
    headers: {
      ...HEADERS.AUTH(token!.token),
    },
  });

  const payload: IApiResponse<void> = await response.json();

  return payload;
}

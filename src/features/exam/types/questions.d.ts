import { IDocumentsFields } from "@/shared/types/api";

export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IQuestion extends IDocumentsFields {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  answers: IAnswer[];
  exam: {
    id: string;
    title: string;
  };
}

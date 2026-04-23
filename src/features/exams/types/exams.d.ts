import { IDocumentsFields } from "@/shared/types/api";

export interface IExam extends IDocumentsFields {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma: {
    id: string;
    title: string;
  };
  immutable: boolean;
}

import { IDocumentsFields } from "@/shared/types/api";

export interface IDiploma extends IDocumentsFields {
  id: string;
  title: string;
  description: string;
  image: string | null;
  immutable: boolean;
}

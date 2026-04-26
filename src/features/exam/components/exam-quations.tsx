import { getExamByIdAction } from "@/features/exams/apis/exams.api";
import { getExamQustionsAction } from "../apis/qustions.api";
import ExamQuestionsForm from "./exam-questions-form";

interface ExamQuestionsProps {
  examId: string;
}

export default async function ExamQuestions({ examId }: ExamQuestionsProps) {
  const examPromise = getExamByIdAction(examId);
  const questionsPromiss = getExamQustionsAction(examId);

  return (
    <ExamQuestionsForm
      examId={examId}
      questionsPromiss={questionsPromiss}
      examPromise={examPromise}
    />
  );
}

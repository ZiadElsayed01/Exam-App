import { getExamByIdAction } from "@/features/exams/apis/exams.api";
import ExamQuestionsForm from "./exam-questions-form";
import { getExamQustionsAction } from "@/features/questions/apis/questions.api";

interface ExamQuestionsProps {
  examId: string;
}

export default async function ExamQuestions({ examId }: ExamQuestionsProps) {
  const examPromise = getExamByIdAction(examId);
  const questionsPromiss = getExamQustionsAction(examId);

  // Handle undefined case by providing a fallback promise
  const safeExamPromise = examPromise.then((result) => {
    if (!result) {
      throw new Error("Exam not found");
    }
    return result;
  });

  return (
    <ExamQuestionsForm
      examId={examId}
      questionsPromiss={questionsPromiss}
      examPromise={safeExamPromise}
    />
  );
}

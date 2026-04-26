import ExamQuestions from "@/features/exam/components/exam-quations";
import Header from "@/shared/components/global/header";
import { BookOpenCheck } from "lucide-react";

interface ExamPageProps {
  params: Promise<{ examName: string; examId: string }>;
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { examName, examId } = await params;

  return (
    <>
      {/* Header */}
      <Header
        title={`${examName} Questions`}
        icon={<BookOpenCheck width={45} height={45} />}
        isBack
      />

      {/* Exam Questions */}
      <ExamQuestions examId={examId} />
    </>
  );
}

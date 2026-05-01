import ExamForm from "@/features/exams/components/admin-dashboard/exam-form";
import { getExamByIdAction } from "@/features/exams/apis/exams.api";
import { getExamQustionsAction } from "@/features/questions/apis/questions.api";
import Link from "next/link";
import ExamQuestionsTable from "@/features/exam/components/admin-dashboard/exam-questions-table";

interface IEditExamPageProps {
  params: Promise<{
    examId: string;
  }>;
  searchParams: Promise<{
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    immutable?: string;
  }>;
}

export default async function EditExamPage({
  params,
  searchParams,
}: IEditExamPageProps) {
  const { examId } = await params;

  const exam = await getExamByIdAction(examId);

  const searchParamsData = await searchParams;

  const { questions: examQuestions } = await getExamQustionsAction(examId, {
    sortBy: searchParamsData.sortBy,
    sortOrder: searchParamsData.sortOrder,
    search: searchParamsData.search,
    immutable:
      searchParamsData.immutable === "true"
        ? true
        : searchParamsData.immutable === "false"
          ? false
          : undefined,
  });

  return (
    <>
        <ExamForm isEdit examId={examId} exam={exam} />

        <div className="bg-gray-100 p-6 pt-0 min-h-screen">
          <div className="bg-primary p-2.5 flex justify-between items-center">
            <h2 className="font-semibold text-white">Exam Questions</h2>
            <Link
              href={`/exams/add-questions/${examId}`}
              className="bg-primary text-white hover:bg-primary/90"
            >
              + Add Questions
            </Link>
          </div>
          <ExamQuestionsTable slug={exam!.title} questions={examQuestions} />
        </div>
    </>
  );
}

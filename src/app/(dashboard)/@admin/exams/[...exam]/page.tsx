import { getExamByIdAction } from "@/features/exams/apis/exams.api";
import ExamBody from "@/features/exams/components/admin-dashboard/exam-body";
import ExamHeader from "@/features/exams/components/admin-dashboard/exam-header";
import ExamQuestionsTable from "@/features/exam/components/admin-dashboard/exam-questions-table";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getExamQustionsAction } from "@/features/questions/apis/questions.api";

interface ExamPageProps {
  params: Promise<{
    exam: string[];
  }>;
  searchParams: Promise<{
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    immutable?: string;
  }>;
}

export default async function ExamPage({
  params,
  searchParams,
}: ExamPageProps) {
  const { exam } = await params;

  if (!exam || exam.length !== 2) {
    notFound();
  }

  const [slug, id] = exam;

  const { exam: examData } = await getExamByIdAction(id);

  const searchParamsData = await searchParams;

  const { questions: examQuestions } = await getExamQustionsAction(id, {
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

  if (!exam) {
    notFound();
  }

  return (
    <>
      <ExamHeader
        title={examData.title}
        editHref={`/exams/edit-exam/${examData.id}`}
        id={examData.id}
      />

      <div className="bg-gray-100 p-6 min-h-screen">
        <ExamBody examData={examData} />

        <div className="mt-6">
          <div className="bg-primary p-2.5 flex justify-between items-center">
            <h2 className="font-semibold text-white">Exam Questions</h2>
            <Link
              href="/"
              className="bg-primary text-white hover:bg-primary/90"
            >
              + Add Questions
            </Link>
          </div>
          <ExamQuestionsTable slug={slug} questions={examQuestions} />
        </div>
      </div>
    </>
  );
}

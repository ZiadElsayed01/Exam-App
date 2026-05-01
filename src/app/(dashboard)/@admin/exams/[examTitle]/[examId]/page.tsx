import ExamQuestionsTable from "@/features/exam/components/admin-dashboard/exam-questions-table";
import { getExamByIdAction } from "@/features/exams/apis/exams.api";
import ExamBody from "@/features/exams/components/admin-dashboard/exam-body";
import ExamHeader from "@/features/exams/components/admin-dashboard/exam-header";
import { getExamQustionsAction } from "@/features/questions/apis/questions.api";
import HeaderSubTitle from "@/shared/components/global/header-sub-title";
import { slugify } from "@/shared/lib/utils/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ExamPageProps {
  params: Promise<{
    examTitle: string;
    examId: string;
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
  const { examTitle, examId } = await params;

  if (!examTitle || !examId) {
    notFound();
  }

  const examData = await getExamByIdAction(examId);

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

  if (!examData) {
    notFound();
  }

  return (
    <>
      <ExamHeader
        title={examData.title}
        editHref={`/exams/edit-exam/${examData.id}`}
        id={examData.id}
        subTitle={
          <HeaderSubTitle
            Title={examData.diploma?.title}
            Id={examData.diploma?.id}
            prefix="Diploma"
            href={`/diplomas/${slugify(examData.diploma?.title)}/${examData.diploma?.id}`}
          />
        }
      />

      <div className="bg-gray-100 p-6 min-h-screen">
        <ExamBody examData={examData} />

        <div className="mt-6">
          <div className="bg-primary p-2.5 flex justify-between items-center">
            <h2 className="font-semibold text-white">Exam Questions</h2>
            <Link
              href={`/exams/create-new-question/${examData.id}`}
              className="bg-primary text-white hover:bg-primary/90"
            >
              + Add Questions
            </Link>
          </div>
          <ExamQuestionsTable slug={examTitle} questions={examQuestions} />
        </div>
      </div>
    </>
  );
}

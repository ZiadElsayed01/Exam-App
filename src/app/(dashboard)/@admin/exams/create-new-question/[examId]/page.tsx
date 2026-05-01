import QuestionForm from "@/features/questions/components/admin-dashboard/question-form";

interface ICreateNewQuestionPageProps {
  params: Promise<{
    examId: string;
  }>;
}

export default async function CreateNewQuestionPage({
  params,
}: ICreateNewQuestionPageProps) {
  const { examId } = await params;

  return <QuestionForm preselectedExamId={examId} />;
}

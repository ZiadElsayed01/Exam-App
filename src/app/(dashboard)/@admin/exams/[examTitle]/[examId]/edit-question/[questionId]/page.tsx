import QuestionForm from "@/features/questions/components/admin-dashboard/question-form";
import { getQuestionById } from "@/features/questions/apis/questions.api";

interface IEditQuestionPageProps {
  params: Promise<{
    examTitle: string;
    examId: string;
    questionId: string;
  }>;
}

export default async function EditQuestionPage({
  params,
}: IEditQuestionPageProps) {
  const { questionId } = await params;

  const question = await getQuestionById(questionId);

  return <QuestionForm question={question} isEdit questionId={questionId} />;
}

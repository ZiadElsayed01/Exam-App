import { getQuestionById } from "@/features/questions/apis/questions.api";
import QuestionBody from "@/features/questions/components/question-body";
import QuestionHeader from "@/features/questions/components/question-header";
import HeaderSubTitle from "@/shared/components/global/header-sub-title";
import { slugify } from "@/shared/lib/utils/utils";

interface IQuestionPageProps {
  params: Promise<{
    examTitle: string;
    examId: string;
    questionName: string;
    questionId: string;
  }>;
}

export default async function QuestionPage({ params }: IQuestionPageProps) {
  const { questionId } = await params;

  const question = await getQuestionById(questionId);

  return (
    <>
      <QuestionHeader
        title={question?.text}
        editHref={`/exams/edit-exam/${question?.examId}`}
        id={questionId}
        subTitle={
          <HeaderSubTitle
            Title={question?.exam.title}
            Id={question?.examId}
            prefix="Exam"
            href={`/exams/${slugify(question!.exam.title)}/${question?.examId}`}
          />
        }
      />

      <div className="bg-gray-100 p-6 min-h-screen">
        <QuestionBody question={question} />
      </div>
    </>
  );
}

import Header from "@/shared/components/global/header";
import { BookOpenCheck } from "lucide-react";
import ExamList from "@/features/exams/components/exam-list";

interface DiplomaExamsPageProps {
  params: Promise<{ diplomaName: string; diplomaId: string }>;
}

export default async function DiplomaExamsPage({
  params,
}: DiplomaExamsPageProps) {
  const { diplomaName, diplomaId } = await params;

  return (
    <>
      <Header
        title={`${diplomaName} Exams`}
        icon={<BookOpenCheck width={45} height={45} />}
        isBack
      />

      <ExamList diplomaId={diplomaId} />
    </>
  );
}


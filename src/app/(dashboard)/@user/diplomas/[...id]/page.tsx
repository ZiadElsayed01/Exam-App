import BreadCrumb from "@/shared/components/global/bread-crumb";
import Header from "@/shared/components/global/header";
import { BookOpenCheck } from "lucide-react";
import ExamList from "@/features/exams/components/exam-list";

interface DiplomaExamsPageProps {
  params: Promise<{ id: string[] }>;
}

export default async function DiplomaExamsPage({
  params,
}: DiplomaExamsPageProps) {
  const { id } = await params;

  return (
    <>
      {/* Main Content */}
      <Header
        title={id[0] + " Exams"}
        icon={<BookOpenCheck width={45} height={45} />}
        isBack
      />

      {/* Exam List */}
      <ExamList diplomaId={id[2]} />
    </>
  );
}

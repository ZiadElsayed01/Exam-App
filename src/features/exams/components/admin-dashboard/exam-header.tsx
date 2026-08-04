"use client";
import SubHeader from "@/shared/components/global/sub-header";
import { useRouter } from "next/navigation";
import { useDeleteExam, useImmutableExam } from "../../hooks/use-exam";
import { toast } from "sonner";

interface ExamHeaderProps {
  title: string;
  editHref: string;
  id: string;
  subTitle: React.ReactNode;
}

export default function ExamHeader({
  title,
  editHref,
  id,
  subTitle,
}: ExamHeaderProps) {
  const router = useRouter();
  const { mutate: deleteExam } = useDeleteExam(id);
  const { mutate: immutableExam } = useImmutableExam(id);

  const handleDeleteExam = () => {
    deleteExam(undefined, {
      onSuccess: () => {
        router.push("/exams");
        toast.success("Exam deleted successfully");
      },
    });
  };

  const handleImmutable = () => {
    immutableExam(undefined, {
      onSuccess: (payload) => {
        toast.success(payload.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <SubHeader
      title={title}
      editHref={editHref}
      onImmutable={handleImmutable}
      onDelete={handleDeleteExam}
      subTitle={subTitle}
    />
  );
}

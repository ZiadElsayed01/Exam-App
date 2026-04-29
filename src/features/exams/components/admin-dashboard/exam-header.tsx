"use client";
import SubHeader from "@/shared/components/sub-header";
import { useRouter } from "next/navigation";
import { useDeleteExam } from "../../hooks/use-exam";
import { toast } from "sonner";

interface ExamHeaderProps {
  title: string;
  editHref: string;
  id: string;
}

export default function ExamHeader({ title, editHref, id }: ExamHeaderProps) {
  const router = useRouter();
  const { mutate: deleteExam } = useDeleteExam(id);

  const handleDeleteExam = () => {
    deleteExam(undefined, {
      onSuccess: () => {
        router.push("/exams");
        toast.success("Exam deleted successfully");
      },
    });
  };

  const handleImmutable = () => {
    // TODO: Implement immutable functionality
    console.log("Make exam immutable");
  };

  return (
    <SubHeader
      title={title}
      editHref={editHref}
      onImmutable={handleImmutable}
      onDelete={handleDeleteExam}
    />
  );
}

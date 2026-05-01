"use client";
import SubHeader from "@/shared/components/global/sub-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface QuestionHeaderProps {
  title?: string;
  editHref: string;
  id: string;
  subTitle: React.ReactNode;
}

export default function QuestionHeader({
  title,
  editHref,
  id,
  subTitle,
}: QuestionHeaderProps) {
  const router = useRouter();
  // const { mutate: deleteExam } = useDeleteExam(id);

  const handleDeleteQuestion = () => {
    // deleteExam(undefined, {
    //   onSuccess: () => {
    //     router.push("/exams");
    toast.success("Question deleted successfully");
    //   },
    // });
  };

  const handleImmutable = () => {
    // TODO: Implement immutable functionality
    console.log("Make question immutable");
  };

  return (
    <SubHeader
      title={title}
      editHref={editHref}
      onImmutable={handleImmutable}
      onDelete={handleDeleteQuestion}
      subTitle={subTitle}
    />
  );
}

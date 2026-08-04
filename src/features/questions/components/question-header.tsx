"use client";
import SubHeader from "@/shared/components/global/sub-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDeleteQuestion, useImmutableQuestion } from "../hooks/use-question";

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
  const { mutate: deleteQuestion } = useDeleteQuestion(id);
  const { mutate: immutableQuestion } = useImmutableQuestion(id);

  const handleDeleteQuestion = () => {
    deleteQuestion(undefined, {
      onSuccess: () => {
        router.back();
        toast.success("Question deleted successfully");
      },
    });
  };

  const handleImmutable = () => {
    immutableQuestion(undefined, {
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
      onDelete={handleDeleteQuestion}
      subTitle={subTitle}
    />
  );
}

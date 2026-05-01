import { ActionsDropdown } from "@/shared/components/global/actions-dropdown";

import { toast } from "sonner";
import { useDeleteQuestion } from "../hooks/use-question";
import { useRouter } from "next/navigation";

interface QuestionActionsDropdown {
  viewLink: string;
  editLink: string;
  id: string;
}

export default function QuestionActionsDropdown({
  viewLink,
  editLink,
  id,
}: QuestionActionsDropdown) {
  const router = useRouter();
  const { mutate: deleteQuestion } = useDeleteQuestion(id);

  const handleDeleteQuestion = () => {
    deleteQuestion(undefined, {
      onSuccess: () => {
        toast.success("Question deleted successfully");
        router.refresh();
      },
    });
  };

  return (
    <ActionsDropdown
      viewLink={viewLink}
      editLink={editLink}
      onDelete={handleDeleteQuestion}
    />
  );
}

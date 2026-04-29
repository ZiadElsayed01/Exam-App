import { ActionsDropdown } from "@/shared/components/actions-dropdown";
import { toast } from "sonner";
import { useDeleteExam } from "../../hooks/use-exam";

interface ExamActionsDropdown {
  viewLink: string;
  editLink: string;
  id: string;
  adding: boolean;
  addLink: string;
  addText: string;
}

export default function ExamActionsDropdown({
  viewLink,
  editLink,
  id,
  adding,
  addLink,
  addText,
}: ExamActionsDropdown) {
  const { mutate: deleteExam } = useDeleteExam(id);

  const handleDeleteExam = () => {
    deleteExam(undefined, {
      onSuccess: () => {
        toast.success("Exam deleted successfully");
      },
    });
  };

  return (
    <ActionsDropdown
      viewLink={viewLink}
      editLink={editLink}
      onDelete={handleDeleteExam}
      adding={adding}
      addLink={addLink}
      addText={addText}
    />
  );
}

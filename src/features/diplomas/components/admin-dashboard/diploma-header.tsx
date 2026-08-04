"use client";
import SubHeader from "@/shared/components/global/sub-header";
import { useRouter } from "next/navigation";
import { useDeleteDiploma, useImmutableDiploma } from "../../hooks/use-diploma";
import { toast } from "sonner";

interface DiplomaHeaderProps {
  title: string;
  editHref: string;
  id: string;
}

export default function DiplomaHeader({
  title,
  editHref,
  id,
}: DiplomaHeaderProps) {
  const router = useRouter();
  const { mutate: deleteDiploma } = useDeleteDiploma(id);
  const { mutate: immutableDiploma } = useImmutableDiploma(id);

  const handleDeleteDiploma = () => {
    deleteDiploma(undefined, {
      onSuccess: () => {
        router.push("/diplomas");
        toast.success("Diploma deleted successfully");
      },
    });
  };

  const handleImmutable = () => {
    immutableDiploma(undefined, {
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
      onDelete={handleDeleteDiploma}
    />
  );
}

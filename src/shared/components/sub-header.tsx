"use client";
import { Button } from "@/shared/components/ui/button";
import { Ban, PencilLine, Trash2 } from "lucide-react";
import Link from "next/link";

interface DiplomaHeaderProps {
  title: string;
  onImmutable: () => void;
  editHref: string;
  onDelete: () => void;
}

export default function SubHeader({
  title,
  onImmutable,
  editHref,
  onDelete,
}: DiplomaHeaderProps) {
  return (
    <div className="bg-white py-1.5 px-6 border-t border-gray-100 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-inter">{title}</h1>

      <div className="flex items-center justify-center gap-2.5">
        <Button
          className="h-10 px-4 font-medium text-sm bg-gray-200 text-gray-800 flex items-center justify-center gap-2.5"
          onClick={onImmutable}
        >
          <Ban className="w-4.5 h-4.5" />
          Immutable
        </Button>
        <Link
          className="h-10 px-4 font-medium text-sm bg-primary text-white flex items-center justify-center gap-2.5"
          href={editHref}
        >
          <PencilLine className="w-4.5 h-4.5" />
          Edit
        </Link>
        <Button
          className="h-10 px-4 font-medium text-sm bg-red-600 text-white flex items-center justify-center gap-2.5"
          onClick={onDelete}
        >
          <Trash2 className="w-4.5 h-4.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}

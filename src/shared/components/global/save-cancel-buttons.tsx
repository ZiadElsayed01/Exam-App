"use client";
import { Save, Layers } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface ISaveCancelButtonsProps {
  isEdit?: boolean;
  title?: string;
  subTitle?: React.ReactNode;
  bulkMode?: boolean;
  showBulkMode?: boolean;
  onBulkModeToggle?: (value: boolean) => void;
}

export default function SaveCancelButtons({
  isEdit,
  title,
  subTitle,
  bulkMode,
  showBulkMode = false,
  onBulkModeToggle,
}: ISaveCancelButtonsProps) {
  const router = useRouter();
  return (
    <div
      className={`px-6 py-1.5 border-t border-gray-100 flex items-center bg-white justify-between`}
    >
      {showBulkMode &&
        (bulkMode ? (
          <Button
            type="button"
            onClick={() => onBulkModeToggle?.(false)}
            className="h-9 px-4 text-sm bg-blue-500 text-white flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Bulk Add Mode
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => onBulkModeToggle?.(true)}
            className="h-9 px-4 text-sm bg-gray-200 text-gray-800 flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Bulk Add Mode
          </Button>
        ))}

      {isEdit && (
        <div>
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
          {subTitle && <div className="text-sm text-gray-600">{subTitle}</div>}
        </div>
      )}

      <div className="flex gap-2 ml-auto">
        <Button
          onClick={() => router.back()}
          className="h-9 w-25 text-sm bg-gray-200 text-gray-800"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="h-10 p-4 text-sm bg-emerald-500 flex items-center justify-center gap-2.5 text-white"
        >
          <Save className="w-4.5 h-4.5" />
          Save
        </Button>
      </div>
    </div>
  );
}

import { Skeleton } from "@/shared/components/ui/skeleton";

export default function QuestionSkeleton() {
  return (
    <>
      {/* Header */}
      <div className="bg-white py-1.5 px-6 border-t border-gray-100 flex items-center justify-between">
        {/* Title */}
        <Skeleton className="h-6 w-40 bg-gray-200" />

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-10 w-28 bg-gray-200" />
          <Skeleton className="h-10 w-24 bg-gray-200" />
          <Skeleton className="h-10 w-28 bg-gray-200" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-100 p-6 min-h-screen">
        <div className="p-4 flex flex-col gap-4 bg-white">
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 bg-gray-200" />
            <Skeleton className="h-4 w-48 bg-gray-200" />
          </div>

          {/* Exam */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 bg-gray-200" />
            <Skeleton className="h-4 w-40 bg-gray-200" />
          </div>

          {/* Answers */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 bg-gray-200" />
            <Skeleton className="h-4 w-32 bg-gray-200" />
          </div>
        </div>
      </div>
    </>
  );
}

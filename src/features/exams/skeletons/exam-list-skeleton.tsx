import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ExamListSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <div
      key={index}
      className="bg-gray-50 relative p-4 flex items-center gap-4 mb-4"
    >
      {/* image */}
      <Skeleton className="w-25 h-25 border" />

      {/* content */}
      <div className="w-full space-y-3">
        {/* title + meta */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />

          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-10/12" />
        </div>
      </div>

      {/* button */}
      <Skeleton className="absolute right-2.5 bottom-2.5 h-8 w-24" />
    </div>
  ));
}

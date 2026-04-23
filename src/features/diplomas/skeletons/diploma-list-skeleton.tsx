import { Skeleton } from "@/shared/components/ui/skeleton";

export default function DiplomaListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <article
          key={i}
          className="min-h-96 p-2.5 flex flex-col justify-end relative overflow-hidden"
        >
          {/* image skeleton */}
          <Skeleton className="absolute inset-0 w-full h-full bg-gray-100" />

          {/* content skeleton */}
          <div className="z-10 bg-gray-50 backdrop-blur-md p-4 space-y-2">
            <Skeleton className="h-6 w-2/3 bg-gray-100" />
            <Skeleton className="h-4 w-full bg-gray-100" />
            <Skeleton className="h-4 w-5/6 bg-gray-100" />
          </div>
        </article>
      ))}
    </div>
  );
}

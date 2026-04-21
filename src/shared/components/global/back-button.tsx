"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-full w-9.5 border-primary border">
      <ChevronLeft
        className="w-6 h-6 text-primary"
        onClick={() => router.back()}
      />
    </div>
  );
}

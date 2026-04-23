"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div
      className="flex items-center justify-center cursor-pointer h-full w-9.5 border-primary border"
      onClick={() => router.back()}
    >
      <ChevronLeft className="w-6 h-6 text-primary" />
    </div>
  );
}

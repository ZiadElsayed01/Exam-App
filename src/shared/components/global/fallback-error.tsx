import { X } from "lucide-react";

export default function FallbackError({ error }: { error: string }) {
  return (
    <div className="relative border border-red-600 bg-red-50 h-9.5 flex items-center justify-center text-center mt-10">
      <div className="absolute flex items-center justify-center w-4.5 h-4.5 rounded-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-red-600 bg-white">
        <X className="w-3 h-3 text-red-600" />
      </div>
      <p className="text-red-500">{error || "Something went wrong"}</p>
    </div>
  );
}

import { X } from "lucide-react";

export default function FallbackError({ error }: { error: string }) {
  return (
    <div className="relative border border-destructive/40 bg-destructive/10 min-h-10 flex items-center justify-center text-center mt-10 rounded-md px-4">
      <div className="absolute flex items-center justify-center w-4.5 h-4.5 rounded-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-destructive/40 bg-background">
        <X className="w-3 h-3 text-destructive" />
      </div>
      <p className="text-destructive">{error || "Something went wrong"}</p>
    </div>
  );
}

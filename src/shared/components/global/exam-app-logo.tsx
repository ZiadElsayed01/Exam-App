import { Folder, Code } from "lucide-react";

export default function ExamAppLogo() {
  return (
    <div className="font-semibold flex items-center gap-2.5 text-primary font-geist-mono text-xl">
      <div className="relative h-10 w-10">
        <Folder fill="var(--primary)" stroke="white" className="h-10 w-10" />

        <Code
          stroke="white"
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4"
        />
      </div>
      Exam App
    </div>
  );
}

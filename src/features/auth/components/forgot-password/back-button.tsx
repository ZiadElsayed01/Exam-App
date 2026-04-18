import { MoveLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface BackButtonProps {
  setStep: (step: string) => void;
}

export default function BackButton({ setStep }: BackButtonProps) {
  return (
    <Button
      onClick={() => setStep("email")}
      className="cursor-pointer border-[1.5px] mb-10 bg-white border-gray-200 h-10 w-10 flex items-center justify-center"
    >
      <MoveLeft className="w-6 h-6 text-black" />
    </Button>
  );
}

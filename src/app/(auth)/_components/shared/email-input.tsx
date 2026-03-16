import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";

interface RegisterEmailInputProps {
  setStep: (step: string) => void;
  step: string;
  setEmail: (email: string) => void;
  variant?: "default" | "secondary";
}

export default function RegisterEmailInput({
  setStep,
  step,
  setEmail,
  variant = "default",
}: RegisterEmailInputProps) {
  return (
    <>
      <form className="gap-12 flex flex-col font-geist-mono">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="w-full"
              id="email"
              type="email"
              placeholder="user@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className="pt-6">
        <Button
          variant={variant}
          type="button"
          className="gap-2.5 "
          onClick={() => setStep(step)}
        >
          Next <ChevronRight />
        </Button>
      </div>
    </>
  );
}

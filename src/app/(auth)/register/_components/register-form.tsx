import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import FormsSubtitle from "../../_components/shared/forms-subtitle";
import { PhoneInput } from "@/components/ui/phone-input";

interface RegisterFormProps {
  setStep: (step: string) => void;
}

export default function RegisterForm({ setStep }: RegisterFormProps) {
  return (
    <div className="space-y-4">
      <FormsSubtitle text="Tell us more about you" />

      <form className="space-y-4 font-geist-mono py-4">
        {/* First and Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-red-600">*</span>
            </Label>
            <Input
              className="w-full"
              id="firstName"
              type="text"
              placeholder="Ahmed"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name <span className="text-red-600">*</span>
            </Label>
            <Input
              className="w-full"
              id="lastName"
              type="text"
              placeholder="Abdullah"
            />
          </div>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username">
            Username <span className="text-red-600">*</span>
          </Label>
          <Input
            className="w-full"
            id="username"
            type="text"
            placeholder="user123"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone <span className="text-red-600">*</span>
          </Label>
          <PhoneInput placeholder="1012345678" defaultCountry="EG" />
        </div>
      </form>

      <div className="pt-6">
        <Button
          variant="secondary"
          type="submit"
          className="gap-2.5 text-gray-800"
          onClick={() => {
            setStep("create-password");
          }}
        >
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

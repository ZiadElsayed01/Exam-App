import FormsSubtitle from "../../_components/shared/forms-subtitle";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerifyOtpProps {
  email: string;
  setStep: (step: string) => void;
}

export default function VerifyOtp({ email, setStep }: VerifyOtpProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2.5">
        <FormsSubtitle text="Verify OTP" />

        {/* Email display */}
        <div>
          <p className="text-gray-500 font-geist-mono">
            Please enter the 6-digits code we have sent to:
          </p>
          <div className="flex items-center">
            <p className="font-geist-mono">{email}.</p>
            <Button
              onClick={() => setStep("email")}
              variant="link"
              className="underline font-geist-mono text-primary font-medium w-fit h-0"
            >
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* OTP input */}
      <div className="flex justify-center py-2.5 flex-col items-center gap-6">
        <InputOTP maxLength={6} defaultValue="123456">
          <InputOTPGroup className="gap-4">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {/* Resend code */}
        <p className="text-gray-500 font-geist-mono text-sm font-medium">
          You can request another code in: 60s
        </p>
      </div>

      <div className="pt-6">
        <Button
          variant="secondary"
          type="submit"
          className="gap-2.5 text-gray-800"
          onClick={() => setStep("register-form")}
        >
          Verify Code
        </Button>
      </div>
    </div>
  );
}

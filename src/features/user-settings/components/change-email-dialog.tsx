"use client";

import OtpVerification from "@/features/auth/components/register/otp-verification";
import ProgressIndicator from "@/shared/components/global/progress-indicator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils/utils";
import React, { useState } from "react";
import ChangeEmailInput from "./change-email-input";

interface ChangeEmailDialogProps {
  trigger: React.ReactNode;
  contentClassName?: string;
  onEmailVerified?: (email: string) => void;
}

type Step = "email" | "verify-otp";

export default function ChangeEmailDialog({
  trigger,
  contentClassName,
  onEmailVerified,
}: ChangeEmailDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setStep("email");
          setEmail("");
        }
      }}
    >
      {React.isValidElement(trigger) ? (
        <DialogTrigger nativeButton render={trigger} />
      ) : (
        <DialogTrigger
          nativeButton
          render={
            <button type="button" className="inline-flex">
              {trigger}
            </button>
          }
        />
      )}

      <DialogContent className={cn("w-145 gap-0", contentClassName)}>
        <DialogHeader className="flex flex-col justify-center mt-2.5 p-9 pb-0">
          <ProgressIndicator
            steps={["Email", "OTP"]}
            currentStep={step === "verify-otp" ? 2 : 1}
          />
          <DialogTitle className="text-3xl font-bold text-gray-800 font-inter">
            Change Email
          </DialogTitle>
        </DialogHeader>

        {step === "email" ? (
          <>
            <div className="text-primary font-bold text-2xl font-inter px-9 mt-7.5">
              Enter your new email
            </div>
            <ChangeEmailInput
              setStep={(s) => setStep(s as Step)}
              setEmail={setEmail}
            />
          </>
        ) : (
          <OtpVerification
            setStep={(s) => setStep(s as Step)}
            email={email}
            onVerified={() => {
              onEmailVerified?.(email);
              setOpen(false);
            }}
            isUpdate
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

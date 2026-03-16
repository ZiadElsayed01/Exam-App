"use client";
import { useState } from "react";
import RegisterEmailInput from "../_components/shared/email-input";
import NavigateLink from "../_components/shared/navigate-link";
import FormsTitle from "../_components/shared/forms-title";
import LinkSent from "./link-sent";
import { MoveLeft } from "lucide-react";
import NewPassword from "./new-password";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="space-y-4 mx-auto w-lg">
        {step === "link-sent" && (
          <div
            className="border-2 border-gray-200 mb-10 w-10 h-10 flex items-center justify-center cursor-pointer"
            onClick={() => setStep("email")}
          >
            <MoveLeft />
          </div>
        )}

        {step === "email" && (
          <>
            <FormsTitle title="Forgot Password" />
            <p className="text-gray-500 font-geist-mono">
              Don’t worry, we will help you recover your <br /> account.
            </p>
            <RegisterEmailInput
              setStep={setStep}
              step={"link-sent"}
              setEmail={setEmail}
              variant="default"
            />
            <div className="space-y-9 text-center">
              <NavigateLink
                text="Don't have an account?"
                href="/register"
                linkText="Create yours"
              />
            </div>
          </>
        )}

        {step === "link-sent" && (
          <>
            <FormsTitle title="Password Reset Sent" />
            <LinkSent email={email} />

            <Button onClick={() => setStep("reset-password")}>reset</Button>
          </>
        )}

        {step === "reset-password" && (
          <>
            <FormsTitle title="Create a New Password" />
            <NewPassword />
            <div className="space-y-9 text-center">
              <NavigateLink
                text="Don't have an account?"
                href="/register"
                linkText="Create yours"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

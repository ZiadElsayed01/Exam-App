"use client";
import FormsTitle from "../_components/shared/forms-title";
import NavigateLink from "../_components/shared/navigate-link";
import RegisterEmailInput from "../_components/shared/email-input";
import { useState } from "react";
import VerifyOtp from "./_components/verify-otp";
import RegisterForm from "./_components/register-form";
import CreatePassword from "./_components/create-password";

export default function RegisterPage() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="space-y-4 mx-auto w-lg">
        <FormsTitle title="Create Account" />

        {step === "email" && (
          <>
            <RegisterEmailInput
              setStep={setStep}
              step={"verify-otp"}
              setEmail={setEmail}
              variant="secondary"
            />
            <div className="space-y-9 text-center">
              <NavigateLink
                text="Already have an account?"
                href="/login"
                linkText="Login"
              />
            </div>
          </>
        )}

        {step === "verify-otp" && <VerifyOtp email={email} setStep={setStep} />}

        {step === "register-form" && <RegisterForm setStep={setStep} />}

        {step === "create-password" && <CreatePassword />}
      </div>
    </>
  );
}

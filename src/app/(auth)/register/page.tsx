"use client";
import EmailInput from "@/features/auth/components/register/email-input";
import OtpVerification from "@/features/auth/components/register/otp-verification";
import PasswordForm from "@/features/auth/components/register/password-form";
import UserInfo from "@/features/auth/components/register/user-info";
import ProgressIndicator from "@/shared/components/global/progress-indicator";
import { useState } from "react";
import { RegisterFormData } from "@/features/auth/schemas/register.schma";

export default function RegisterPage() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [shouldFocusEmail, setShouldFocusEmail] = useState(false);
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({});

  const handleSetStep = (newStep: string) => {
    if (newStep === "email" && step === "verify-otp") {
      setShouldFocusEmail(true);
    } else if (newStep !== "email") {
      setShouldFocusEmail(false);
    }
    setStep(newStep);
  };

  const renderStep = () => {
    switch (step) {
      case "email":
        return (
          <EmailInput
            setStep={handleSetStep}
            setEmail={setEmail}
            autoFocus={shouldFocusEmail}
          />
        );
      case "verify-otp":
        return <OtpVerification setStep={handleSetStep} email={email} />;
      case "user-info":
        return (
          <UserInfo
            setStep={handleSetStep}
            email={email}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "password":
        return <PasswordForm formData={formData} />;
      default:
        return (
          <EmailInput
            setStep={handleSetStep}
            setEmail={setEmail}
            autoFocus={shouldFocusEmail}
          />
        );
    }
  };

  return (
    <main className="flex flex-col w-113">
      {/* Progress Indicator */}
      <div className={`${step === "email" ? "hidden" : ""}`}>
        <ProgressIndicator
          steps={["Email", "OTP", "User Info", "Password"]}
          currentStep={step === "verify-otp" ? 2 : step === "user-info" ? 3 : 4}
        />
      </div>

      {/* Title */}
      <h1 className="font-inter text-2xl font-bold text-gray-800 mb-4">
        Create Account
      </h1>

      {/* Form Content */}
      {renderStep()}
    </main>
  );
}

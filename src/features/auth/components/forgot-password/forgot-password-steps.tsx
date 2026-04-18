"use client";
import { useState } from "react";
import ForgotEmailInput from "./forgot-email-input";
import ResetLink from "./reset-link";

export default function ForgotPasswordSteps() {
  const [step, setStep] = useState<string>("email");
  const [email, setEmail] = useState<string>("");

  const renderStep = () => {
    switch (step) {
      case "email":
        return <ForgotEmailInput setStep={setStep} setEmail={setEmail} />;
      case "reset-link":
        return <ResetLink email={email} setStep={setStep} />;
      default:
        return <ForgotEmailInput setStep={setStep} setEmail={setEmail} />;
    }
  };

  return (
    /* Form Content */
    renderStep()
  );
}

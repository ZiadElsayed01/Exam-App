"use client";
import { Button } from "@/shared/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import useOtpCounter from "../../hooks/register/use-otp-counter";
import useSendOtp from "../../hooks/register/use-send-otp";
import { Loader2 } from "lucide-react";
import FallbackError from "@/shared/components/global/fallback-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpFormData, otpSchema } from "../../schemas/register.schma";
import { Controller, useForm } from "react-hook-form";
import useVerifyOtp from "../../hooks/register/use-verify-otp";

interface OtpVerificationProps {
  setStep: (step: string) => void;
  email: string;
}

export default function OtpVerification({
  setStep,
  email,
}: OtpVerificationProps) {
  const {
    mutate: sendOtp,
    isPending: sendOtpLoading,
    error: sendOtpError,
  } = useSendOtp();

  const {
    mutate: verifyOtp,
    isPending: verifyLoading,
    error: verifyError,
  } = useVerifyOtp();

  const { setInLocalStorage } = useOtpCounter();

  const { duration } = useOtpCounter(email);

  const error = sendOtpError || verifyError;

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email,
      code: "",
    },
  });

  const onSubmit = (values: OtpFormData) => {
    verifyOtp(values, {
      onSuccess: () => {
        setStep("user-info");
      },
    });
  };

  return (
    <>
      <div className="text-2xl text-primary font-inter font-bold">
        Verify OTP
      </div>

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

      {/* OTP Verification Form */}
      <div className="flex justify-center mt-6.5 flex-col items-center gap-6">
        <Controller
          name="code"
          control={form.control}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              aria-invalid={form.formState.errors.code ? "true" : "false"}
            >
              <InputOTPGroup className="gap-4">
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {form.formState.errors.code && (
          <p className="text-sm text-destructive font-geist-mono">
            {form.formState.errors.code.message}
          </p>
        )}

        {/* Resend code */}
        {duration > 0 ? (
          <p className="text-gray-500 font-geist-mono text-sm font-medium">
            You can request another code in: {duration}s
          </p>
        ) : (
          <p
            onClick={() => {
              setInLocalStorage(email);
              sendOtp({ email });
            }}
            className="text-primary font-geist-mono text-sm font-medium cursor-pointer underline"
          >
            {sendOtpLoading ? (
              <Loader2 className="animate-spin w-5 h-5 text-primary" />
            ) : (
              "Resend Code"
            )}
          </p>
        )}
      </div>

      {error && <FallbackError error={error.message} />}

      <div className="pt-6">
        <Button
          variant="secondary"
          type="submit"
          className="gap-2.5 text-gray-800"
          onClick={form.handleSubmit(onSubmit)}
          disabled={verifyLoading}
        >
          {verifyLoading ? (
            <Loader2 className="animate-spin w-5 h-5 text-primary" />
          ) : (
            "Verify Code"
          )}
        </Button>
      </div>
    </>
  );
}

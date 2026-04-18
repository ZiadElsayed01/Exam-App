import Link from "next/link";
import BackButton from "./back-button";

interface ResetLinkProps {
  email: string;
  setStep: (step: string) => void;
}

export default function ResetLink({ email, setStep }: ResetLinkProps) {
  return (
    <>
      <BackButton setStep={setStep} />
      <section>
        <h1 className="font-inter text-2xl font-bold text-gray-800 mb-4">
          Password Reset Link
        </h1>

        <div className="space-y-4">
          <p className="text-gray-800">
            We have sent a password reset link to:{" "}
            <span className="text-primary">{email}</span>.
          </p>

          <p className="text-gray-800">
            Please check your inbox and follow the instructions to reset your
            password.
          </p>

          <p className="text-gray-500 text-sm">
            If you don’t see the email within a few minutes, check your spam or
            junk folder.
          </p>
        </div>

        <p className="text-sm font-medium text-gray-500 mt-16">
          Don&apos;t have an account?
          <Link href="/register" className="text-primary">
            {" "}
            Create yours
          </Link>
        </p>
      </section>
    </>
  );
}

import NavigateLink from "../_components/shared/navigate-link";

interface LinkSentProps {
  email: string;
}

export default function LinkSent({ email }: LinkSentProps) {
  return (
    <>
      {/* Heading */}
      <div className="font-geist-mono space-y-4 pb-6">
        <p className="text-gray-800">
          We have sent a password reset link to:{" "}
          <span className="text-primary">{email}</span>.
        </p>
        <p className="text-gray-800">
          Please check your inbox and follow the <br /> instructions to reset
          your password.
        </p>
        <p className="text-gray-500">
          If you don&apos;t see the email within a few minutes, check your spam
          or junk folder.
        </p>
      </div>

      <div className="mt-4 pt-6">
        <NavigateLink
          text="Didn't have an account?"
          href="/register"
          linkText="Create yours"
        />
      </div>
    </>
  );
}

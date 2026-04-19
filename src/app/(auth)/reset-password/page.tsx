import ResetPasswordForm from "@/features/auth/components/reset-password/reset-password-form";
import Link from "next/link";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;
  return (
    <>
      <div>
        <h1 className="font-inter text-2xl font-bold text-gray-800 mb-2.5">
          Create New Password
        </h1>
        <p className=" text-gray-500">
          create a new strong password for your account
        </p>

        {/* Reset Password Form */}
        <ResetPasswordForm token={token} />

        {/* Register Link */}
        <p className="text-sm font-medium text-gray-500 text-center">
          Don&apos;t have an account?
          <Link href="/register" className="text-primary">
            {" "}
            Create yours
          </Link>
        </p>
      </div>
    </>
  );
}

import LoginForm from "@/features/auth/components/login/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-10 w-113">
      {/* Title */}
      <h1 className="font-inter text-2xl font-bold text-gray-800">Login</h1>

      {/* Login Form */}
      <LoginForm />

      {/* Register Link */}
      <p className="text-sm font-medium text-gray-500 text-center">
        Don&apos;t have an account?
        <Link href="/register" className="text-primary">
          {" "}
          Create yours
        </Link>
      </p>
    </div>
  );
}

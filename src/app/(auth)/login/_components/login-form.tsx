import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginForm() {
  return (
    <>
      <form className="gap-12 flex flex-col font-geist-mono">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Username</Label>
            <Input id="email" type="string" placeholder="user123" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" />
            <Link
              href="/forgot-password"
              className="block w-full text-right text-primary text-sm font-medium"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </form>
      <Button type="submit">Login</Button>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewPassword() {
  return (
    <>
      <p className="text-gray-500 font-geist-mono">
        Create a new strong password for your account.
      </p>
      <div className="space-y-4">
        <form className="space-y-4 font-geist-mono py-4">
          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              className="w-full"
              id="password"
              type="password"
              placeholder="********"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              className="w-full"
              id="confirmPassword"
              type="password"
              placeholder="********"
            />
          </div>
        </form>

        <div className="pt-6">
          <Button type="submit">Reset Password</Button>
        </div>
      </div>
    </>
  );
}

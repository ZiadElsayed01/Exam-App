import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormsSubtitle from "../../_components/shared/forms-subtitle";

export default function CreatePassword() {
  return (
    <div className="space-y-4">
      <FormsSubtitle text="Create a strong password" />

      <form className="space-y-4 font-geist-mono py-4">
        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">
            Password <span className="text-red-600">*</span>
          </Label>
          <Input
            className="w-full"
            id="password"
            type="password"
            placeholder="********"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            Confirm Password <span className="text-red-600">*</span>
          </Label>
          <Input
            className="w-full"
            id="confirmPassword"
            type="password"
            placeholder="********"
          />
        </div>
      </form>

      <div className="pt-6">
        <Button type="submit">Create Account</Button>
      </div>
    </div>
  );
}

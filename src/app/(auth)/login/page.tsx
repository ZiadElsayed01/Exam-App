import FormsTitle from "../_components/shared/forms-title";
import LoginForm from "./_components/login-form";
import NavgateLink from "../_components/shared/navgate-link";

export default function LoginPage() {
  return (
    <div className="space-y-12 w-1/2 mx-auto">
      <FormsTitle title="Login" />

      <LoginForm />

      <NavgateLink
        text="Don't have an account?"
        href="/register"
        linkText="Create yours"
      />
    </div>
  );
}

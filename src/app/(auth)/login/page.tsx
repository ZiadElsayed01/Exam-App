import FormsTitle from "../_components/shared/forms-title";
import LoginForm from "./_components/login-form";
import NavigateLink from "../_components/shared/navigate-link";

export default function LoginPage() {
  return (
    <div className="space-y-9 w-1/2 mx-auto">
      <FormsTitle title="Login" />

      <LoginForm />

      <div className="text-center">
        <NavigateLink
          text="Don't have an account?"
          href="/register"
          linkText="Create yours"
        />
      </div>
    </div>
  );
}

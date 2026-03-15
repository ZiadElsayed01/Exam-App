import ExamAppLogo from "@/components/ui/shared/exam-app-logo";
import AuthAsideHeader from "./aside-header";
import AuthFeature from "./feature";
import { Brain, BookOpenCheck, RectangleEllipsis } from "lucide-react";

const features = [
  {
    icon: <Brain strokeWidth={1.5} />,
    title: "Tailored Diplomas",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
  {
    icon: <BookOpenCheck strokeWidth={1.5} />,
    title: "Focused Exams",
    description:
      "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
  },
  {
    icon: <RectangleEllipsis strokeWidth={1.5} />,
    title: "Smart Multi-Step Forms",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
];

export default function AuthAside() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 -right-20 bg-primary/10 blur-2xl w-90 h-90 rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 bg-primary/10 blur-2xl w-90 h-90 rounded-full"></div>

      {/* Main content */}
      <div className="absolute inset-0 bg-login-aside/10 backdrop-blur-md w-lg mx-auto flex flex-col justify-center gap-14">
        {/* Logo */}
        <ExamAppLogo />

        {/* Header text */}
        <div className="flex flex-col gap-14">
          <AuthAsideHeader />

          {/* Features */}
          <div className="flex flex-col gap-9">
            {features.map((feature, index) => (
              <AuthFeature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

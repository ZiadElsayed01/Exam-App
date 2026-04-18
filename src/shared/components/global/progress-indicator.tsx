import { cn } from "@/shared/lib/utils/utils";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export default function ProgressIndicator({
  steps,
  currentStep,
}: StepperProps) {
  return (
    <div className="w-full flex items-center justify-center mb-2.5">
      <div className="flex items-center w-full">
        {steps.map((_, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep >= stepNumber;
          const isCompleted = currentStep > stepNumber;
          const currentStepIndex = currentStep - 1;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={index}
              className={cn("flex items-center", !isLast && "flex-1")}
            >
              {/* Square */}
              <div
                className={cn(
                  "w-2.5 h-2.5 rotate-45",
                  index === currentStepIndex && "outline-5 outline-blue-100",
                  isActive ? "bg-primary" : "bg-muted border border-primary",
                )}
              />

              {/* Line */}
              {!isLast && (
                <div className="flex-1 mx-2">
                  <div
                    className={cn(
                      "h-[2px] w-full",
                      isCompleted
                        ? "bg-primary"
                        : "border-t border-dashed border-primary",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
  Check,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      icons={{
        success: <Check className="size-4 text-emerald-600" />,
        info: <InfoIcon className="size-4 text-red-600" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--sonner-background)",
          "--normal-text": "#ffffff",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "!w-[400px] !rounded-none !border-none",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

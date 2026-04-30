"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils/utils";

interface SimpleDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  align?: "start" | "center" | "end";
}

export function SimpleDropdown({
  trigger,
  children,
  className,
  contentClassName,
  align = "start",
}: SimpleDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getAlignmentClass = () => {
    switch (align) {
      case "start":
        return "left-0";
      case "center":
        return "left-1/2 transform -translate-x-1/2";
      case "end":
        return "right-0";
      default:
        return "left-0";
    }
  };

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-1  min-w-50 overflow-hidden border border-gray-200 bg-white shadow-md z-50",
            getAlignmentClass(),
            contentClassName,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface SimpleDropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function SimpleDropdownItem({
  children,
  onClick,
  className,
  disabled = false,
}: SimpleDropdownItemProps) {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-none font-normal bg-white p-3.5 text-sm text-black outline-none transition-colors focus:bg-blue-50",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </div>
  );
}

export function SimpleDropdownSeparator({ className }: { className?: string }) {
  return <div className={cn("-mx-1 my-1 h-px bg-gray-200", className)} />;
}

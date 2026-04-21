import React from "react";
import BackButton from "./back-button";

interface HeaderProps {
  icon?: React.ReactNode;
  title: string;
  isBack?: boolean;
}

export default function Header({ icon, title, isBack = false }: HeaderProps) {
  return (
    <div className="flex items-center gap-2.5 h-[77px]">
      {isBack && <BackButton />}
      <div className="bg-primary text-white w-full p-4 h-full flex items-center gap-4">
        <div className="flex items-center gap-2">{icon}</div>
        <p className="text-3xl font-inter font-semibold">{title}</p>
      </div>
    </div>
  );
}

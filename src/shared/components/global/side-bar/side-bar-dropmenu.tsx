"use client";

import { EllipsisVertical, LogOut, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function SideBarDropmenu({
  isAdminSuper,
}: {
  isAdminSuper: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropDownItems = [
    {
      label: "Account",
      href: "/account",
      icon: <UserRound className="w-4.5 h-4.5 text-gray-500" />,
      show: true,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <EllipsisVertical
        className={`${isAdminSuper ? "text-white" : "text-gray-500"} cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white w-66">
          {dropDownItems
            .filter((item) => item.show)
            .map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center gap-2 p-4 border-b border-gray-100"
              >
                {item.icon}
                <p>{item.label}</p>
              </Link>
            ))}

          <div
            className="flex items-center gap-2 p-4 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="w-4.5 h-4.5 text-destructive rotate-180" />
            <p className="text-destructive">Logout</p>
          </div>
        </div>
      )}
    </div>
  );
}

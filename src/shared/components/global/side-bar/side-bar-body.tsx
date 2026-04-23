"use client";
import { USER_ROLES } from "@/features/auth/constants/user.constants";
import { BookOpenCheck, GraduationCap, Logs, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ElevateLogo from "../../../../../public/ElevateLogo.png";
import WhiteElevateLogo from "../../../../../public/WhiteElevateLogo.png";
import ExamAppLogo from "../exam-app-logo";

const userLinks = [
  {
    id: 1,
    name: "Diplomas",
    href: "/",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "Account settings",
    href: "/account",
    icon: <UserRound className="w-6 h-6" />,
  },
];

const adminLinks = [
  {
    id: 1,
    name: "Diplomas",
    href: "/",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "Exams",
    href: "/exams",
    icon: <BookOpenCheck className="w-6 h-6" />,
  },
  {
    id: 3,
    name: "Account settings",
    href: "/account",
    icon: <UserRound className="w-6 h-6" />,
  },
  {
    id: 4,
    name: "Audit Logs",
    href: "/audit-logs",
    icon: <Logs className="w-6 h-6" />,
  },
];

interface SideBarBodyProps {
  isAdminSuper: boolean;
}

export default function SideBarBody({ isAdminSuper }: SideBarBodyProps) {
  const pathname = usePathname();
  return (
    <div className="w-70.5">
      {/* Elevate Logo */}
      <div className="mb-2.5">
        <Image
          src={isAdminSuper ? WhiteElevateLogo : ElevateLogo}
          alt="Elevate Logo"
          className="w-48 h-9"
          style={{ width: "auto" }}
          loading="eager"
        />
      </div>
      {/* Exam App Logo */}
      <ExamAppLogo
        role={isAdminSuper ? USER_ROLES.ADMIN_SUPER : USER_ROLES.USER}
      />
      {/* Navigation Links */}
      <nav className="mt-15">
        <ul>
          {(isAdminSuper ? adminLinks : userLinks).map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className={`flex items-center gap-2.5 p-4 mb-2.5 ${isAdminSuper ? "text-white" : "text-gray-500"} ${
                  pathname === link.href &&
                  (!isAdminSuper
                    ? "text-primary bg-blue-100 border border-blue-600 "
                    : "text-white") +
                    (isAdminSuper
                      ? "text-white bg-gray-700 border border-gray-400"
                      : "text-gray-500")
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

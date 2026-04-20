"use client";
import { USER_ROLES } from "@/features/auth/constants/user.constants";
import { BookOpenCheck, GraduationCap, Logs, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ElevateLogo from "../../../../public/ElevateLogo.png";
import WhiteElevateLogo from "../../../../public/WhiteElevateLogo.png";
import ExamAppLogo from "./exam-app-logo";
import SideBarFooter from "./side-bar-footer";

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
    href: "/account-settings",
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
    href: "/account-settings",
    icon: <UserRound className="w-6 h-6" />,
  },
  {
    id: 4,
    name: "Audit Logs",
    href: "/audit-logs",
    icon: <Logs className="w-6 h-6" />,
  },
];

export default function SideBar() {
  const pathname = usePathname();
  const { data: user } = useSession();

  const isAdmin = user?.role === USER_ROLES.ADMIN;

  return (
    <div
      className={`p-10 flex flex-col bg-blue-50 h-screen ${isAdmin ? "bg-gray-800" : ""}`}
    >
      {/* Elevate Logo */}
      <div className="mb-2.5">
        <Image
          src={isAdmin ? WhiteElevateLogo : ElevateLogo}
          alt="Elevate Logo"
          className="w-48 h-9"
        />
      </div>
      {/* Exam App Logo */}
      <ExamAppLogo role={isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER} />
      {/* Navigation Links */}
      <div className="mt-15">
        <ul>
          {(isAdmin ? adminLinks : userLinks).map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className={`flex items-center gap-2.5 p-4 mb-2.5 ${isAdmin ? "text-white" : "text-gray-500"} ${
                  pathname === link.href &&
                  (!isAdmin
                    ? "text-primary bg-blue-100 border border-blue-600 "
                    : "text-white") +
                    (isAdmin
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
      </div>
      {/* User Info */}
      <div className="mt-auto">
        <SideBarFooter />
      </div>
    </div>
  );
}

"use client";

import { BookOpenCheck, GraduationCap, Logs, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const isActive = (href: string) => {
    // Home route
    if (href === "/") {
      return pathname === "/";
    }

    // Normal nested routes
    return pathname === href || pathname.startsWith(href + "/");
  };

  const links = isAdminSuper ? adminLinks : userLinks;

  return (
    <nav className="mt-15">
      <ul>
        {links.map((link) => {
          const active = isActive(link.href);

          return (
            <li key={link.id}>
              <Link
                href={link.href}
                className={`flex items-center gap-2.5 p-4 mb-2.5 border transition-border 
                  ${
                    active
                      ? isAdminSuper
                        ? "text-white bg-gray-700 border border-gray-400"
                        : "text-primary bg-blue-100 border border-blue-600"
                      : isAdminSuper
                        ? "text-white"
                        : "text-gray-500 border border-transparent"
                  }
                `}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

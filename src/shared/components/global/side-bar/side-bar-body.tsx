"use client";
import {
  adminLinks,
  userLinks,
} from "@/shared/constants/side-bar-links.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarBodyProps {
  isAdminSuper: boolean;
}

export default function SideBarBody({ isAdminSuper }: SideBarBodyProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

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
                        ? "text-white border-transparent"
                        : "text-gray-500 border border-transparent"
                  }
                `}
              >
                <link.icon className="w-6 h-6" />
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

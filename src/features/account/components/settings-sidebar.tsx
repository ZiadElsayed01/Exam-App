"use client";
import { Button } from "@/shared/components/ui/button";
import { CircleUserRound, Lock, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const userSettinsNavLinks = [
  {
    id: 1,
    name: "Profile",
    href: "/account",
    icon: <CircleUserRound className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "Change Password",
    href: "/account/change-password",
    icon: <Lock className="w-6 h-6" />,
  },
];

export default function SettingsSidebar() {
  const pathname = usePathname();
  return (
    <div className="w-70.5 p-6 bg-white shrink-0 flex flex-col">
      <ul>
        {userSettinsNavLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={`flex items-center gap-2.5 px-4 py-2.5 mb-2.5 text-gray-500 ${
                pathname === link.href && "text-primary bg-blue-50"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <Button
        variant="destructive"
        className="flex items-center gap-2 px-4 py-2.5 cursor-pointer mt-auto text-md font-normal justify-start"
        onClick={() => signOut()}
      >
        <LogOut className="w-6 h-6 text-red-600 rotate-180" />
        Logout
      </Button>
    </div>
  );
}

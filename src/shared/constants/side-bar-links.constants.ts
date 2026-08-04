import {
  BookOpenCheck,
  GraduationCap,
  Logs,
  LucideProps,
  UserRound,
} from "lucide-react";

interface ISideBarLink {
  id: number;
  name: string;
  href: string;
  icon: React.ComponentType<LucideProps>;
}

export const userLinks: ISideBarLink[] = [
  {
    id: 1,
    name: "Diplomas",
    href: "/",
    icon: GraduationCap,
  },
  {
    id: 2,
    name: "Account settings",
    href: "/account",
    icon: UserRound,
  },
];

export const adminLinks: ISideBarLink[] = [
  {
    id: 1,
    name: "Diplomas",
    href: "/diplomas",
    icon: GraduationCap,
  },
  {
    id: 2,
    name: "Exams",
    href: "/exams",
    icon: BookOpenCheck,
  },
  {
    id: 3,
    name: "Account settings",
    href: "/account",
    icon: UserRound,
  },
  {
    id: 4,
    name: "Audit Log",
    href: "/audit-log",
    icon: Logs,
  },
];

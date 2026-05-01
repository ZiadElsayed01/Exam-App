import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface HeaderSubTitleProps {
  Title?: string;
  Id?: string;
  prefix?: string;
  href: string;
}

export default function HeaderSubTitle({
  Title,
  Id,
  prefix,
  href,
}: HeaderSubTitleProps) {
  if (!Title || !Id) {
    return null;
  }

  return (
    <div className="text-gray-400 text-sm flex items-center gap-1 font-inter">
      {prefix}
      {": "}
      <Link
        className="border-b border-gray-400 flex gap-1 items-center font-inter"
        href={href}
      >
        {Title} <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

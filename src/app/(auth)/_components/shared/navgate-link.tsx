import Link from "next/link";

interface NavgateLinkProps {
  text: string;
  href: string;
  linkText: string;
}

export default function NavgateLink({
  text,
  href,
  linkText,
}: NavgateLinkProps) {
  return (
    <p className="font-geist-mono text-sm font-medium text-gray-500 text-center">
      {text}
      <Link href={href} className="text-primary">
        {" "}
        {linkText}
      </Link>
    </p>
  );
}

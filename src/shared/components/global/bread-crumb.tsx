"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/components/ui/breadcrumb";

export default function BreadCrumb() {
  const pathname = usePathname();

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  let segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((seg) => !uuidRegex.test(seg));

  // if root "/"
  if (segments.length === 0) {
    segments = ["diplomas"];
  }

  const isSingle = segments.length === 1;

  return (
    <Breadcrumb className="p-4 bg-white">
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = "/" + segments.slice(0, index + 1).join("/");

          return (
            <div key={index} className="flex items-center">
              {index !== 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage
                    className={`capitalize ml-2 ${
                      isSingle ? "text-gray-400" : "text-primary"
                    }`}
                  >
                    {segment.replace(/-/g, " ")}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={(props) => (
                      <Link {...props} href={href}>
                        {props.children}
                      </Link>
                    )}
                    className="text-gray-400 capitalize ml-2"
                  >
                    {segment.replace(/-/g, " ")}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

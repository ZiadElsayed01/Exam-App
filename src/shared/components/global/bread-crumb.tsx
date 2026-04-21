"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

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
  const paths = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="p-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={(props) => (
              <Link {...props} href="/">
                {props.children}
              </Link>
            )}
            className={paths.length === 0 ? "text-primary" : "text-gray-400"}
          >
            Diplomas
          </BreadcrumbLink>
        </BreadcrumbItem>

        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-primary capitalize ml-2">
                    {path.replace("-", " ")}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={(props) => (
                      <Link {...props} href={href}>
                        {props.children}
                      </Link>
                    )}
                    className="text-gray-400 capitalize"
                  >
                    {path.replace("-", " ")}
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

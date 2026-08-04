import React from "react";
import ReactQueryProvider from "./providers/react-query.provider";
import { TanStackDevtools } from "@tanstack/react-devtools";
import NextAuthProvider from "./providers/next-auth.provider";

const isProduction = process.env.NODE_ENV === "production";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        {children}
        {!isProduction && <TanStackDevtools config={{ defaultOpen: false }} />}
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}

import React from "react";
import ReactQueryProvider from "./prodivers/react-query.prodiver";
import { TanStackDevtools } from "@tanstack/react-devtools";
import NextAuthProvider from "./prodivers/next-auth.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        {children}
        <TanStackDevtools config={{ defaultOpen: false }} />
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}

"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { CountryProvider } from "@/hooks/use-country";
import { ModalProvider } from "@/hooks/use-modal";
import { addClient } from "@/lib/utils";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <ApolloProvider
          client={addClient(process.env.NEXT_PUBLIC_GRAPHQL_SERVER as string)}
        >
          <CountryProvider>
            <ModalProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ModalProvider>
          </CountryProvider>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;

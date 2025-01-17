'use client'

import { SidebarProvider } from "@/components/ui/sidebar";
import { addClient } from "@/lib/utils";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <>
      <ApolloProvider client={addClient(process.env.NEXT_PUBLIC_GRAPHQL_SERVER as string)}>
        <SidebarProvider>{children}</SidebarProvider>
      </ApolloProvider>
    </>
  );
};

export default Providers;

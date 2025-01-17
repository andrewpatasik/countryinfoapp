import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return <>
    <SidebarProvider>
      {children}
    </SidebarProvider>
  </>;
};

export default Providers;

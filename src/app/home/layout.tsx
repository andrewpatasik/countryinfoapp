import AppNavigation from "@/components/app-navigation";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center">
      <AppNavigation />
      {children}
      <Toaster />
    </div>
  );
};

export default HomeLayout;

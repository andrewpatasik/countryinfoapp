import AppNavigation from "@/components/app-navigation";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center">
      <AppNavigation />
      {children}
    </div>
  );
};

export default HomeLayout;

"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";
import { SidebarTrigger } from "./ui/sidebar";

const AppNavigation = () => {
  const isMobile = useIsMobile(430);


  return !isMobile ? (
    <>
      <DesktopNavigation />
      <SidebarTrigger />
    </>
  ) : (
    <MobileNavigation />
  );
};

export default AppNavigation;

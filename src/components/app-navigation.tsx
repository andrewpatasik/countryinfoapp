"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";

const AppNavigation = () => {
  const isMobile = useIsMobile(431);

  return !isMobile ? <DesktopNavigation /> : <MobileNavigation />;
};

export default AppNavigation;

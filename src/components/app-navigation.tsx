"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopNavigation from "./desktop-navigation";
import MobileNavigation from "./mobile-navigation";
import { useSession } from "next-auth/react";

const AppNavigation = () => {
  const {data: session} = useSession();

  const isMobile = useIsMobile(431);

  return !isMobile ? <DesktopNavigation userData={session?.user} /> : <MobileNavigation />;
};

export default AppNavigation;

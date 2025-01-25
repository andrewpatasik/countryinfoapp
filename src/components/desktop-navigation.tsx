"use client";

import { ChevronsUpDown, LogOut, House, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import { UserValue } from "@/app/api/auth/[...nextauth]/route";
import { NavigationLinkValue, UserDataValue } from "@/app/types";

const navigationLink: NavigationLinkValue[] = [
  {
    title: "Home",
    href: "/",
    icon: <House />,
  },
];
let user: UserDataValue = {
  name: "User Profile",
  icon: <User />,
  avatar: "",
  href: "/login",
};

const DesktopNavigation = ({
  userData,
  status,
}: {
  userData: UserValue | undefined;
  status: "authenticated" | "loading" | "unauthenticated";
}) => {
  useEffect(() => {
    switch (status) {
      case "authenticated":
        user = {
          ...user,
          name: userData?.name as string | undefined,
          avatar: userData?.image as string | undefined,
        };
        break;
      case "unauthenticated":
        break;
      default:
        user = {
          ...user,
          name: "loading...",
        };

        break;
    }
  }, [status]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationLink.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      {item.icon}
                      <p>{item.title}</p>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar>
                    <AvatarImage src={userData?.image as string} alt="" />
                    <AvatarFallback className="bg-gray-100 rounded-full p-1">
                      {user.icon}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span>{userData ? userData.name : user.name}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="bg-gray-50 min-w-56 rounded border border-gray-300 pl-2"
              >
                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      signOut();
                      toast({
                        title:
                          "You have been logged out. Redirecting to sign up",
                      });
                    }}
                  >
                    <div className="flex space-x-1.5 items-center my-1">
                      <LogOut className="size-4 font-bold" />
                      <span className="text-sm ">Log Out</span>
                    </div>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DesktopNavigation;

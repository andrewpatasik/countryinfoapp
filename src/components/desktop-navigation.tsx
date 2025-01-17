"use client";

import { ChevronsUpDown, LogOut, Heart, House, User } from "lucide-react";
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
import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import Link from "next/link";

const navigationLink: { title: string; href: string; icon: ReactNode }[] = [
  {
    title: "Home",
    href: "/",
    icon: <House />,
  },
  {
    title: "Favorites",
    href: "/favorites",
    icon: <Heart />,
  },
];
const user: { name: string; avatar: string; icon: ReactNode; href: string } = {
  name: "User Profile",
  icon: <User />,
  avatar: "",
  href: "/login",
};

const DesktopNavigation = () => {
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
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="bg-gray-100 rounded-full p-1">
                      {user.icon}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span>{user.name}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="bg-gray-50 min-w-56 rounded border border-gray-300 pl-2"
              >
                <DropdownMenuItem>
                  <Link href={user.href}>
                    <div className="flex space-x-1.5 items-center my-1">
                      <LogOut className="size-4 font-bold" />
                      <span className="text-sm ">Log Out</span>
                    </div>
                  </Link>
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

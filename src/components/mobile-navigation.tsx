import { UserValue } from "@/app/api/auth/[...nextauth]/route";
import { NavigationLinkValue } from "@/app/types";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { toast } from "@/hooks/use-toast";
import { HouseIcon, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { FC, ReactElement, ReactNode } from "react";

const ICON_SIZE: number = 30;

interface IListItem {
  userData?: UserValue;
  className?: string;
  title: string;
  href?: string;
  children: ReactNode;
}

const navigationLink: NavigationLinkValue[] = [
  {
    title: "Home",
    href: "/",
    icon: <HouseIcon size={ICON_SIZE} />,
  },
  {
    title: "Profile",
    icon: <UserIcon size={ICON_SIZE} />,
  },
];

const MobileNavigation = ({
  userData,
  status
}: {
  userData: UserValue | undefined,
  status: "authenticated" | "loading" | "unauthenticated";
}) => {
  return (
    <div className="bg-gray-100 w-full fixed z-50 bottom-0 p-4 border-t">
      <NavigationMenu className="h-full">
        <NavigationMenuList className="w-screen h-full justify-around">
          {navigationLink.map((item, index) => (
            <ListItem userData={userData} title={item.title} href={item.href}>
              {item.icon}
            </ListItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem: FC<IListItem> = ({
  userData,
  className,
  children,
  href,
  title,
}) => {
  return (
    <NavigationMenuItem>
      {!userData ? (
        <NavigationMenuLink href={href} className={className}>
          <div className="flex flex-col items-center space-y-.75">
            {children}
            <p className="text-sm">{title}</p>
          </div>
        </NavigationMenuLink>
      ) : (
        <button
          onClick={() => {
            signOut();
            toast({
              title: "You have been logged out. Redirecting to sign up",
            });
          }}
          className={className}
        >
          <div className="flex flex-col items-center space-y-.75">
            {children}
            <p className="text-sm">{userData.name}</p>
          </div>
        </button>
      )}
    </NavigationMenuItem>
  );
};

export default MobileNavigation;

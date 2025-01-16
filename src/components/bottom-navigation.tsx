import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { HouseIcon, HeartIcon, UserIcon } from "lucide-react";
import { FC, ReactElement } from "react";

const navigationLink: { title: string; href: string; icon: any }[] = [
  {
    title: "Home",
    href: "/",
    icon: <HouseIcon size={36} />,
  },
  {
    title: "Favorites",
    href: "#",
    icon: <HeartIcon size={36} />,
  },
  {
    title: "Profile",
    href: "/login",
    icon: <UserIcon size={36} />,
  },
];

const BottomNavigation = () => {
  return (
    <div className="bg-gray-100 w-full fixed bottom-0 p-4">
      <NavigationMenu className="h-full">
        <NavigationMenuList className="w-screen h-full justify-around">
          {navigationLink.map((item, index) => (
            <ListItem title={item.title} href={item.href}>
              {item.icon}
            </ListItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

interface IListItem {
  className?: string;
  title: string;
  href: string;
  children: ReactElement;
}

const ListItem: FC<IListItem> = ({ className, children, href, title }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink href={href} className={className}>
        <div className="flex flex-col items-center space-y-.75">
          {children}
          <p className="text-sm">{title}</p>
        </div>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default BottomNavigation;

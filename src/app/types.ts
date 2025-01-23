import { ReactNode } from "react";

export type CountryValue = {
  name: string;
  capital: string;
  currency: string;
  emoji: string;
  continent: {
    name: string;
  };
  languages: {
    name: string;
    native: string;
  }[];
  subdivisions: {
    name: string;
  }[];
};

export interface UserDataValue {
  name: string | undefined;
  avatar: string | undefined;
  icon: ReactNode | undefined;
  href: string | undefined;
}

export interface NavigationLinkValue {
  title: string;
  href?: string;
  icon: ReactNode;
}

"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FC, ReactElement } from "react";

interface ISheet {
  open: boolean;
  onOpenChange: () => void;
  children: ReactElement;
  title: string;
}

const AppSheet: FC<ISheet> = ({ title, onOpenChange, open, children }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <section className="flex flex-col space-y-8 h-full">{children}</section>
      </SheetContent>
    </Sheet>
  );
};

export default AppSheet;

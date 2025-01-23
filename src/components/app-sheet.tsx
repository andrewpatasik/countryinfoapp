"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FC, useState } from "react";

interface ISheet {
  open: boolean;
  onOpenChange: () => void;
  children: any;
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

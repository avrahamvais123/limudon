"use client";

import React from "react";
import { Turn as Hamburger } from "hamburger-react";
import colors from "tailwindcss/colors";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const HiddenContent = () => {
  return (
    <div className="hidden">
      <SheetHeader>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
    </div>
  );
};
const SideMenu = ({ children, open, setOpen }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Hamburger
          rounded
          color={colors.slate[400]}
          size={25}
          toggled={open}
          toggle={setOpen}
          distance="sm"
        />
      </SheetTrigger>
      <SheetContent
        closeIcon={false}
        onClose={() => setOpen(false)}
        className="p-0 border-none"
      >
        <HiddenContent />
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;

"use client";

import React, { useRef } from "react";
import { Turn as Hamburger } from "hamburger-react";
import colors from "tailwindcss/colors";
import { user } from "@lib/valtio";
import { useSnapshot } from "valtio";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import { cn } from "@lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Content = ({ items, setOpen }) => {
  const snapshot = useSnapshot(user);
  console.log("snapshot?.picture: ", snapshot?.picture);

  return (
    <div className="size-full pt-10 bg-p-700 flex flex-col items-center gap-8">
      <div className="relative min-w-20 min-h-20">
        <div className="absolute inset-0 scale-[115%] border-2 border-p-500 rounded-full" />
        {snapshot?.picture ? (
          <Image
            src={snapshot?.picture}
            alt="avatar"
            sizes={20}
            fill
            className="rounded-full w-auto"
          />
        ) : (
          <FaUserAlt className="text-6xl text-s-400" />
        )}
      </div>

      <div className="text-p-100">
        <h3 className="text-2xl font-bold">{`${snapshot?.name || "אורח"}`}</h3>
        <h3 className="text-center">{`ניקוד: ${snapshot?.score || 0}`}</h3>
      </div>

      <div className="size-full flex flex-col items-center">
        {items?.map((item, i) => {
          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "w-full px-6 py-2",
                "flex items-center gap-4",
                "border-r-2 border-transparent",
                "text-start text-p-300",
                "hover:bg-p-600 hover:border-p-50 hover:text-p-50"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
const SideMenu = ({ items, open, setOpen }) => {
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
  const contentRef = useRef();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        <Content items={items} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;

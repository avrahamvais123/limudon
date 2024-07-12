"use client";

import Image from "next/image";
import React, { useState } from "react";
import Menu from "../ui/Menu";
import { usePathname } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { user } from "@lib/valtio";
import { useSnapshot } from "valtio";
import { useMedia } from "react-use";
import SideMenu from "./SideMenu";
import { cn } from "@lib/utils";

const Header = () => {
  const pathname = usePathname();
  const snapshot = useSnapshot(user);
  const [open, setOpen] = useState(false);
  const md = useMedia("(min-width: 768px)");

  const noHeaderRoutes = ["/auth/login", "/auth/signup"];

  const items = [
    { title: "בית", href: "/" },
    { title: "חידון", href: "/quiz" },
    { title: "התחברות", href: "/auth/signup" },
  ];

  return (
    <div
      className={cn(
        "w-full h-20 px-4 flex items-center justify-between gap-4 bg-white",
        noHeaderRoutes.includes(pathname) && "hidden"
      )}
    >
      <Image
        src="/logo-limudon.png"
        alt="logo"
        width={40}
        height={20}
        priority
        className="w-auto"
      />

      <Menu items={items} />

      <SideMenu open={open} setOpen={setOpen}>
        <div className="size-full flex flex-col items-center">
          <div className="relative">
            <Image
              src={user?.picture}
              alt="avatar"
              sizes={50}
              fill
              className="rounded-full"
            />
          </div>
        </div>
      </SideMenu>

      <div className="h-full min-w-fit flex items-center justify-center gap-4">
        {/* {md && (
          <div className="flex flex-col  justify-center text-xs">
            <p className="">{`שלום ${snapshot?.name || "אורח"}`}</p>
            <p className="">{`ניקוד: ${snapshot?.score || 0}`}</p>
          </div>
        )} */}
        <div className="relative h-10 w-auto aspect-square bg-s-200 rounded-full p-2 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-s-300 scale-[120%]" />
          {snapshot?.picture !== "" ? (
            <Image
              src={snapshot?.picture}
              alt="avatar"
              sizes={50}
              fill
              priority
              className="w-auto rounded-full"
            />
          ) : (
            <FaUserAlt className="size-full text-s-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

/* 
  {
      title: "חידון",
      subItems: [
        { title: "חידון ארמית", href: "/quiz/aramit" },
        { title: "חידון אנגלית", href: "/quiz/english" },
      ],
    },
*/

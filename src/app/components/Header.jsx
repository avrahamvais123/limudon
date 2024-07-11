"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Menu from "../ui/Menu";
import { usePathname } from "next/navigation";
import { user } from "@lib/valtio";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  const pathname = usePathname();
  console.log("user: ", user);
  console.log("user?.picture: ", user?.picture);

  // Define routes where Header should not be displayed
  const noHeaderRoutes = ["/auth/login", "/auth/signup"];

  const items = [
    { title: "בית", href: "/" },
    { title: "חידון", href: "/quiz" },
    { title: "התחברות", href: "/auth/signup" },
  ];

  return (
    <>
      {!noHeaderRoutes.includes(pathname) && (
        <header className="w-full h-20 px-4 flex items-center justify-between gap-4 bg-white">
          <Image
            src="/logo-limudon.png"
            alt="logo"
            width={40}
            height={20}
            priority
            className="w-auto"
          />

          <Menu items={items} />

          <div className="h-full min-w-fit flex items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center text-xs">
              <p className="">{`שלום ${user?.name || "אורח"}`}</p>
              <p className="">{`ניקוד: ${user?.score || 0}`}</p>
            </div>
            {user?.picture !== "" ? (
              <Image
                src="/logo-limudon.png"
                alt="avatar"
                width={20}
                height={20}
                priority
                className="w-auto"
              />
            ) : (
              <div className="h-10 w-auto aspect-square bg-s-200 rounded-full p-2 flex items-center justify-center">
                <FaUserAlt className="size-full text-s-400" />
              </div>
            )}
          </div>
        </header>
      )}
    </>
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

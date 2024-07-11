"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Menu from "../ui/Menu";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

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

          <Button>כניסה</Button>
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

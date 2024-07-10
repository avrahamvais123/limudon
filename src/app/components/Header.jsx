"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Menu from "../ui/Menu";

const Header = () => {
  const items = [
    { title: "בית", href: "/" },
    { title: "חידון", href: "/quiz" },
    { title: "התחברות", href: "/login" },
  ];

  return (
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

      <Button className="">כניסה</Button>
    </header>
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

"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full h-20 px-4 flex items-center justify-between">
      <Image
        src="/logo-limudon.png"
        alt="logo"
        width={40}
        height={20}
        className="w-auto"
      />
      <Button className="">כניסה</Button>
    </header>
  );
};

export default Header;

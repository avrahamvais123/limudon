"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

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

      <NavigationMenu dir="rtl">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>חידון</NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col gap-2 w-96">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuLink>Link 2</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>חידון</NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col gap-2 w-96">
              <NavigationMenuLink>Link 1</NavigationMenuLink>
              <NavigationMenuLink>Link 2</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Button className="">כניסה</Button>
    </header>
  );
};

export default Header;

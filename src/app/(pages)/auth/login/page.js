import React from "react";
import Login from "../components/Login";
import Image from "next/image";
import { getUserSession } from "../components/session";

const Page = () => {
  return (
    <div className="size-full flex justify-center items-center">
      <div className="size-full max-w-96 max-sm:max-w-full bg-s-100 flex items-center justify-center">
        <Login />
      </div>
      <div className="relative size-full bg-p-600 flex items-center justify-center max-sm:hidden">
        <Image
          src="/books-background.jpg"
          alt="login background image"
          sizes={50}
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Page;

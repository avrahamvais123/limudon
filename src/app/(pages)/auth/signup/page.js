import React from "react";
import Signup from "../components/Signup";
import Image from "next/image";

const Page = () => {
  return (
    <div className="size-full flex justify-center items-center">
      <div className="size-full max-w-96 max-sm:max-w-full bg-s-100 flex items-center justify-center">
        <Signup />
      </div>
      <div className="relative size-full bg-p-600 flex items-center justify-center max-sm:hidden">
        <Image
          src="/books-background.jpg"
          sizes={50}
          alt="signup background image"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Page;

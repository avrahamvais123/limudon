import React from "react";
import LoginForm from "./components/LoginForm";
import Image from 'next/image'

const Page = () => {
  return (
    <div className="size-full flex justify-center items-center">
      <div className="size-full max-w-96 max-sm:max-w-full bg-s-100 flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="relative size-full bg-p-600 flex items-center justify-center max-sm:hidden">
        <Image src="/books-background.jpg" sizes={50} fill className="object-cover" />
      </div>
    </div>
  );
};

export default Page;

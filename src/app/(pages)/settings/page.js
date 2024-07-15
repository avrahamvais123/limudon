import React from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { FaUserAlt } from "react-icons/fa";

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token?.value, secret);
  console.log('payload: ', payload);

  return (
    <div className="size-full border-0 border-red-600 flex flex-col justify-start items-center overflow-hidden">
      <div className="size-full flex-grow overflow-auto">
        <div className="w-full h-32 bg-gradient-to-l from-blue-600 to-sky-300 text-transparent" />

        <div /* FIRST */
          className="w-full h-1/6 flex items-center justify-center border-0 border-s-400 rounded-md"
        >
          <div /* IMAGE */ className="relative h-full w-40 min-w-40">
            <div className="absolute left-14 top-4 -translate-x-1/2 -translate-y-1/2 p-4 border-[3px] border-white shadow-lg bg-s-100 rounded-full">
              {payload?.image ? (
                <Image src={payload?.image} alt="avatar" sizes={50} fill />
              ) : (
                <FaUserAlt className="text-6xl text-s-600" />
              )}
            </div>
          </div>
          
          <div /* NAME & EMAIL */ className="size-full p-2">
            <p className="text-s-600 text-xl">{payload?.name || "שם"}</p>
            <p className="text-s-400">{payload?.email || "אימייל"}</p>
          </div>
        </div>

        <div className="size-full flex max-md:flex-col gap-2">
          <div className="h-fit w-1/3 max-lg:w-full flex flex-col items-center justify-center gap-2">
            <div /* SECOND */
              className="size-full h-[40rem] flex items-center justify-center border-2 border-s-100 rounded-md bg-white"
            >
              c
            </div>
          </div>

          <div /* THIRD */
            className="size-full h-[40rem] w-2/3 max-lg:w-full flex items-center justify-center bg-white border-2 border-s-100 rounded-md"
          >
            d
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

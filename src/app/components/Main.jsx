"use client";

import React from "react";
import { useCookie } from "react-use";
import { useJwt } from "react-jwt";
import { useSnapshot } from "valtio";
import { user } from "@lib/valtio";
import { useUpdateEffect } from "react-use";

const Main = () => {
  const [value, updateCookie, deleteCookie] = useCookie("token");
  const snapshot = useSnapshot(user);
  const { decodedToken, isExpired } = useJwt(value);
  
  console.log('snapshot: ', snapshot);
  
  useUpdateEffect(() => {
    console.log("decodedToken from useeffect: ", decodedToken);
    user.userId = decodedToken?.userId;
    user.name = decodedToken?.name;
    user.email = decodedToken?.email;
    user.picture = decodedToken?.picture;
  }, [decodedToken, value]);

  return (
    <main className="size-full p-6 flex flex-col justify-center items-center gap-10 bg-s-50">
      <button
        onClick={() => {
          console.log("value: ", value);
        }}
      >
        get cookie
      </button>

      <button
        onClick={() => {
          updateCookie("my-awesome-cookie");
        }}
      >
        update cookie
      </button>

      <button
        onClick={() => {
          deleteCookie("token");
        }}
      >
        delete cookie
      </button>

      <button
        onClick={() => {
          console.log("user: ", user);
          //user = "שלמה";
          user.name = "שלמה";
        }}
      >
        set user
      </button>
    </main>
  );
};

export default Main;

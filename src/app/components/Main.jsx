"use client";

import React from "react";
import { useCookie } from "react-use";
import { useJwt } from "react-jwt";
import { useSnapshot } from "valtio";
import { user } from "@lib/valtio";
import { useUpdateEffect } from "react-use";

const Main = () => {
  const [value] = useCookie("token");
  const snapshot = useSnapshot(user);
  const { decodedToken, isExpired } = useJwt(value);

  console.log("snapshot: ", snapshot);

  useUpdateEffect(() => {
    console.log("decodedToken from useeffect: ", decodedToken);
    if (!decodedToken) return;
    user.userId = decodedToken?.userId;
    user.name = decodedToken?.name;
    user.email = decodedToken?.email;
    user.picture = decodedToken?.picture;
  }, [decodedToken, value]);

  return (
    <main className="size-full p-6 flex flex-col justify-center items-center gap-10 bg-s-50">
     main
    </main>
  );
};

export default Main;

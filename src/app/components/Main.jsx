"use client";

import React from "react";
import { useCookie } from "react-use";
import { useJwt } from "react-jwt";
import { useSnapshot } from "valtio";
import { user } from "@lib/valtio";
import { useUpdateEffect } from "react-use";

const Main = ({ token }) => {
  console.log('token: ', token);
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
    user.score = decodedToken?.score;
  }, [decodedToken, value]);

  return (
    <div className="size-full p-6 flex flex-col justify-center items-center gap-10 bg-s-50">
      main
    </div>
  );
};

export default Main;

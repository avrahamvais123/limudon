"use client";

import React from "react";
import { useJwt } from "react-jwt";
import { useSnapshot } from "valtio";
import { user } from "@lib/valtio";
import { useUpdateEffect } from "react-use";

const Main = ({ token }) => {
  const snapshot = useSnapshot(user);
  const { decodedToken, isExpired } = useJwt(token);

  console.log("snapshot: ", snapshot);

  useUpdateEffect(() => {
    console.log("decodedToken from useeffect: ", decodedToken);
    if (!decodedToken) return;

    user.userId = decodedToken?.userId;
    user.name = decodedToken?.name;
    user.email = decodedToken?.email;
    user.picture = decodedToken?.picture;
    user.score = decodedToken?.score;
  }, [decodedToken, token]);

  return (
    <div className="size-full p-6 flex flex-col justify-center items-center gap-10 bg-s-50">
      main
    </div>
  );
};

export default Main;

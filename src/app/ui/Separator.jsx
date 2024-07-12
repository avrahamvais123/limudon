"use client";

import React from "react";

const Separator = ({ children }) => {
  return (
    <div className="h-[0.05rem] w-full my-4 relative bg-s-300">
      {children && (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-s-400 text-center">
          {children}
        </p>
      )}
    </div>
  );
};

export default Separator;

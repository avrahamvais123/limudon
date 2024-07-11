"use client";

import React, { useState } from "react";
import { cn } from "@lib/utils";

const Input = ({
  name,
  register,
  errors,
  wrapperCn,
  labelCn,
  inputCn,
  errorsCn,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = `${name}-input`;

  return (
    <div className={cn("relative size-full max-h-12 flex flex-col", wrapperCn)}>
      <label
        htmlFor={inputId}
        className={cn(
          "absolute right-2 top-1/2 bg-white text-s-400 px-2 -translate-y-1/2 transition-all duration-300",
          isFocused || props.value
            ? "text-xs right-3 top-0.5"
            : "text-base text-s-300",
          labelCn
        )}
      >
        {name}
      </label>
      <input
        id={inputId}
        className={cn(
          "size-full p-4",
          "text-s-500 rounded-md transition-all duration-300",
          "border border-s-200 outline-none",
          "focus:border-p-500",
          inputCn
        )}
        {...register}
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(!!e.target.value)}
      />
      {errors && (
        <p className={cn("text-xs text-red-600 self-end", errorsCn)}>
          {errors?.message}
        </p>
      )}
    </div>
  );
};

export default Input;

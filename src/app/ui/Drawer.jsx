"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef } from "react";

const Drawer = forwardRef(
  (
    {
      children,
      trigger = false,
      parentAnim,
      parentClassName,
      parentOnClick,
      parentProps,
      parentType = "div",
      childAnim,
      childClassName,
      childProps,
      childOnClick,
      childType = "div",
    },
    ref
  ) => {
    const defaultParentAnim = {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
      transition: { duration: 0.1 },
    };
    const defaultChildAnim = {
      initial: { opacity: 0, x: "100%" },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: "100%" },
      transition: { duration: 0.5, ease: "easeInOut" },
    };
    const ParentMotionComponent = motion[parentType];
    const ChildMotionComponent = motion[childType];

    return (
      <AnimatePresence>
        {trigger && (
          <ParentMotionComponent
            ref={ref}
            {...parentProps}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={parentAnim || defaultParentAnim}
            onClick={parentOnClick}
            className={cn(
              "z-20 size-full absolute inset-0",
              "flex items-center justify-center",
              "bg-black/75",
              parentClassName
            )}
          >
            <AnimatePresence>
              {trigger && (
                <ChildMotionComponent
                  {...childProps}
                  variants={childAnim || defaultChildAnim}
                  onClick={childOnClick}
                  className={cn(
                    "size-full",
                    "flex flex-col justify-center gap-6",
                    childClassName
                  )}
                >
                  {children}
                </ChildMotionComponent>
              )}
            </AnimatePresence>
          </ParentMotionComponent>
        )}
      </AnimatePresence>
    );
  }
);

Drawer.displayName = "Drawer";

export default Drawer;

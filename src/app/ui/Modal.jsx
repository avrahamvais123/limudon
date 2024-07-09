"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef } from "react";

const Modal = forwardRef(
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
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
    };
    const defaultChildAnim = {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
      transition: { duration: 0.3 },
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
              "bg-s-900/95",
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
                    "size-full p-4",
                    "flex flex-col items-center justify-center gap-6",
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

Modal.displayName = "Modal";

export default Modal;

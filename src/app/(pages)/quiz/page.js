"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MdTranslate } from "react-icons/md";
import { motion } from "framer-motion";

const Page = () => {
  const quizOptions = [
    { title: "חידון ארמית", href: "/quiz/aramit", icon: <MdTranslate /> },
    { title: "חידון אנגלית", href: "/quiz/english", icon: <MdTranslate /> },
  ];

  const containerVariants = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div
      className={cn(
        "size-full flex-grow",
        "overflow-y-auto",
        "flex justify-center"
      )}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn(
          "w-full h-fit p-4",
          "grid grid-cols-4 auto-rows-auto gap-4",
          "max-md:grid-cols-1 max-md:auto-rows-auto"
        )}
      >
        {quizOptions.map((option) => {
          return (
            <motion.div key={option.title} variants={itemVariants}>
              <Link
                href={option.href}
                className={cn(
                  "size-full h-40",
                  "rounded-md bg-white transition-all",
                  "flex flex-col items-center justify-center gap-2",
                  "border border-s-100 text-s-400",
                  "hover:border-p-600 hover:text-p-600",
                  "active:bg-p-600 active:text-white"
                )}
              >
                <span className="text-4xl">{option.icon}</span>
                <span>{option.title}</span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Page;

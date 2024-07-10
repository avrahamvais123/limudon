"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import Link from "next/link";

const SubItem = ({ items, closeModal }) => {
  return (
    <ol className="size-fit min-w-32 p-1 flex flex-col items-center justify-center gap-1 rounded-md rounded-t-none bg-white shadow-md">
      {items.map((item) => (
        <li
          key={item.title}
          className="w-full text-center bg-s-50 hover:bg-s-100 transition-all rounded-sm p-2"
        >
          <Link href={item.href} onClick={closeModal}>
            {item.title}
          </Link>
        </li>
      ))}
    </ol>
  );
};

const MenuItem = ({ item, isOpen, onClick, closeModal }) => {
  const handleItemClick = (e) => {
    if (!item.subItems || item.subItems.length === 0) {
      // במקרה של פריט ללא תתי פריטים, נעבור לעמוד באמצעות Link
      closeModal();
      return;
    }
    e.preventDefault();
    onClick();
  };

  return (
    <div className="relative">
      <Link
        href={item.href || "#"}
        onClick={handleItemClick}
        className={`w-full text-center hover:bg-s-100 transition-all rounded-sm p-2 cursor-pointer`}
      >
        {item.title}
      </Link>
      <AnimatePresence>
        {isOpen && item.subItems && item.subItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: "10%", x: "-50%" }}
            animate={{ opacity: 1, y: "0%", x: "-50%" }}
            exit={{ opacity: 0, y: "10%", x: "-50%" }}
            className="z-50 absolute top-full left-1/2 -translate-x-1/2 w-fit"
          >
            <SubItem items={item.subItems} closeModal={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Menu = ({ items }) => {
  const [openItemIndex, setOpenItemIndex] = useState(null);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setOpenItemIndex(null);
  });

  const closeModal = () => setOpenItemIndex(null);

  return (
    <div className="relative size-full flex items-center justify-center">
      <div ref={ref} className="size-fit cursor-pointer">
        <div className="flex gap-2 mt-2">
          {items.map((item, index) => (
            <MenuItem
              key={item.title}
              item={item}
              isOpen={openItemIndex === index}
              closeModal={closeModal}
              onClick={() =>
                setOpenItemIndex(openItemIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
